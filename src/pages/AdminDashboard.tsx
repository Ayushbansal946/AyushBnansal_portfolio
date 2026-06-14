import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LogOut, Save, RefreshCw, Database } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { fallbackProjects, fallbackExperiences, fallbackSkills, fallbackCertificates, fallbackProfile } from '../data/fallbackData';

type SectionType = 'projects' | 'experiences' | 'skills' | 'certificates' | 'profile';

function ImagePreview({ url }: { url: string }) {
  const [dimensions, setDimensions] = useState<{w: number, h: number} | null>(null);
  const [error, setError] = useState(false);
  const isVideo = url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm');

  useEffect(() => {
    if (isVideo || !url) return;
    const img = new Image();
    img.onload = () => {
      setDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => setError(true);
    img.src = url;
  }, [url, isVideo]);

  if (!url) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
      {isVideo ? (
        <video src={url} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} muted />
      ) : (
        <img src={url} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} alt="preview" />
      )}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{url}</p>
        {isVideo ? (
          <p style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>Video Format (Will autoplay in carousel)</p>
        ) : dimensions ? (
          <p style={{ fontSize: '0.7rem', color: dimensions.w < 800 ? '#FF6B6B' : 'var(--text-muted)' }}>
            Resolution: {dimensions.w} x {dimensions.h} px {dimensions.w < 800 ? '(Warning: Low Res)' : ''}
          </p>
        ) : error ? (
          <p style={{ fontSize: '0.7rem', color: '#FF6B6B' }}>Failed to load preview</p>
        ) : (
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Loading dimensions...</p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SectionType>('projects');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch data for active tab
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'profile') {
        const snap = await getDoc(doc(db, 'settings', 'profile'));
        if (snap.exists()) {
          setData([snap.data()]);
        } else {
          setData([fallbackProfile]);
        }
      } else {
        const snap = await getDocs(collection(db, activeTab));
        const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort items by num if it exists
        items.sort((a: any, b: any) => {
          if (a.num && b.num) return a.num.localeCompare(b.num);
          return 0;
        });
        setData(items);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setMessage("Error fetching data: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      if (activeTab === 'profile') {
        await setDoc(doc(db, 'settings', 'profile'), data[0]);
        localStorage.setItem('cache_profile_settings', JSON.stringify(data[0]));
      } else {
        for (const item of data) {
          if (!item.id) continue;
          const ref = doc(db, activeTab, item.id);
          await setDoc(ref, item);
        }
      }
      setMessage('✅ Successfully saved changes to ' + activeTab);
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Error saving: ' + err.message);
    }
    setSaving(false);
  };

  const handleInitializeDatabase = async () => {
    if (!window.confirm("This will overwrite your database with the default template data. Are you sure?")) return;
    setSaving(true);
    setMessage('Initializing database... please wait.');
    try {
      // Migrate Projects
      for (const item of fallbackProjects) {
        await setDoc(doc(db, 'projects', item.id), item);
      }
      // Migrate Experiences
      for (const item of fallbackExperiences) {
        await setDoc(doc(db, 'experiences', item.id), item);
      }
      // Migrate Skills
      for (const item of fallbackSkills) {
        await setDoc(doc(db, 'skills', item.id), item);
      }
      // Migrate Certificates
      for (const item of fallbackCertificates) {
        await setDoc(doc(db, 'certificates', item.id), item);
      }
      setMessage('✅ Database successfully initialized with all template data!');
      fetchData(); // Refresh the view
    } catch (err: any) {
      setMessage('❌ Error initializing database: ' + err.message);
    }
    setSaving(false);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index][field] = value.split(',').map(s => s.trim());
    setData(newData);
  };

  const handleImageUpdate = (itemIndex: number, imgIndex: number, newUrl: string) => {
    const newData = [...data];
    const newImages = [...newData[itemIndex].images];
    newImages[imgIndex] = newUrl;
    newData[itemIndex].images = newImages;
    setData(newData);
  };

  const handleImageAdd = (itemIndex: number) => {
    const newData = [...data];
    if (!newData[itemIndex].images) newData[itemIndex].images = [];
    if (newData[itemIndex].images.length >= 7) return;
    newData[itemIndex].images = [...newData[itemIndex].images, ''];
    setData(newData);
  };

  const handleImageRemove = (itemIndex: number, imgIndex: number) => {
    const newData = [...data];
    const newImages = [...newData[itemIndex].images];
    newImages.splice(imgIndex, 1);
    newData[itemIndex].images = newImages;
    setData(newData);
  };

  const handleAddNew = () => {
    const newItemId = `${activeTab}_${Date.now()}`;
    let newItem: any = { id: newItemId };
    if (activeTab === 'projects') {
      newItem = { ...newItem, num: `0${data.length + 1}`, title: '', subtitle: '', description: '', images: ['', '', ''], tags: [], type: '', tools: '', details: [] };
    } else if (activeTab === 'experiences') {
      newItem = { ...newItem, role: '', company: '', duration: '', description: '', skills: [] };
    } else if (activeTab === 'skills') {
      newItem = { ...newItem, category: '', items: [] };
    } else if (activeTab === 'certificates') {
      newItem = { ...newItem, title: '', issuer: '', fileUrl: '', type: 'image' };
    }
    setData([...data, newItem]);
  };

  const handleDeleteItem = async (id: string, index: number) => {
    if (data.length <= 1) {
      alert('You must have at least one item!');
      return;
    }
    if (!window.confirm('Are you sure you want to completely delete this item? This cannot be undone.')) return;
    try {
      if (id) {
        await deleteDoc(doc(db, activeTab, id));
      }
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      // Update cache immediately to prevent flash of old data
      localStorage.setItem(`cache_${activeTab}`, JSON.stringify(newData));
      setMessage('✅ Successfully deleted item');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Error deleting: ' + err.message);
    }
  };

  // Common styles
  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-main)',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    padding: '12px 16px',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text-main)', display: 'flex', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <div style={{ padding: '32px 24px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', letterSpacing: '0.1em', color: 'var(--white)' }}>
            AYUSH ADMIN PANEL
          </h1>
        </div>
        
        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(['profile', 'projects', 'experiences', 'skills', 'certificates'] as SectionType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px 20px',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: activeTab === tab ? 'var(--white)' : 'transparent',
                color: activeTab === tab ? 'var(--bg)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FF6B6B',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', padding: '48px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--white)', textTransform: 'uppercase' }}>
              {activeTab}
            </h2>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={handleInitializeDatabase}
                disabled={saving || loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid #FF6B6B',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  color: '#FF6B6B',
                  borderRadius: '8px',
                  cursor: (saving || loading) ? 'not-allowed' : 'pointer',
                  opacity: (saving || loading) ? 0.5 : 1,
                }}
              >
                <Database size={16} /> Init DB
              </button>
              <button
                onClick={fetchData}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-main)',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                <RefreshCw size={16} /> Refresh
              </button>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 32px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--white)',
                  color: 'var(--bg)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (saving || loading) ? 'not-allowed' : 'pointer',
                  opacity: (saving || loading) ? 0.7 : 1,
                }}
              >
                <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </header>

          <AnimatePresence>
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  padding: '16px 24px',
                  marginBottom: '32px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  backgroundColor: message.includes('❌') ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 200, 83, 0.1)',
                  color: message.includes('❌') ? '#FF6B6B' : '#00C853',
                  border: `1px solid ${message.includes('❌') ? 'rgba(255, 107, 107, 0.2)' : 'rgba(0, 200, 83, 0.2)'}`,
                }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
              LOADING DATA...
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            >
              {data.map((item, index) => (
                <div 
                  key={item.id || index} 
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.05em', color: 'var(--white)' }}>
                      {activeTab === 'profile' ? 'GLOBAL PROFILE SETTINGS' : `${activeTab.toUpperCase().slice(0, activeTab.length - 1)} ${index + 1}${item.title || item.role || item.category ? ` - ${item.title || item.role || item.category}` : ''}`}
                    </h3>
                    {data.length > 1 && (
                      <button 
                        onClick={() => handleDeleteItem(item.id, index)}
                        style={{ padding: '8px 16px', background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.05em' }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                    {Object.keys(item).filter(k => k !== 'id').map(key => {
                      const isArray = Array.isArray(item[key]);
                      const isLongText = typeof item[key] === 'string' && (item[key].length > 60 || key === 'description');
                      
                      if (key === 'images') {
                        const imgArray = item[key] || [];
                        const isInvalid = imgArray.length < 3 || imgArray.length > 7;
                        return (
                          <div key={key} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: isInvalid ? '1px solid rgba(255,107,107,0.5)' : '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                              <label style={{ ...labelStyle, marginBottom: 0 }}>
                                Images & Videos <span style={{ color: isInvalid ? '#FF6B6B' : 'var(--accent)' }}>({imgArray.length} items. Min: 3, Max: 7)</span>
                              </label>
                              <button 
                                onClick={() => handleImageAdd(index)}
                                disabled={imgArray.length >= 7}
                                style={{ padding: '6px 12px', background: 'var(--accent)', color: 'black', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: imgArray.length >= 7 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                              >
                                + Add Link
                              </button>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Recommended: 1200x900px (4:3 aspect ratio). Paste .mp4 URLs for video playback.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {imgArray.map((url: string, imgIdx: number) => (
                                <div key={imgIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                      type="text"
                                      placeholder="https://..."
                                      value={url}
                                      onChange={(e) => handleImageUpdate(index, imgIdx, e.target.value)}
                                      style={{ ...inputStyle, flex: 1 }}
                                      onFocus={e => e.currentTarget.style.borderColor = 'var(--white)'}
                                      onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                    <button 
                                      onClick={() => handleImageRemove(index, imgIdx)}
                                      style={{ padding: '0 16px', background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px', cursor: 'pointer' }}
                                    >
                                      X
                                    </button>
                                  </div>
                                  {url && <ImagePreview url={url} />}
                                </div>
                              ))}
                            </div>
                            {isInvalid && (
                              <p style={{ color: '#FF6B6B', fontSize: '0.85rem', marginTop: '16px', fontWeight: 'bold' }}>⚠️ Please provide between 3 and 7 image/video URLs.</p>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={key}>
                          <label htmlFor={`input-${index}-${key}`} style={labelStyle}>
                            {key} {isArray && <span style={{ color: 'var(--accent)' }}>(Comma separated)</span>}
                          </label>
                          
                          {isLongText ? (
                             <textarea
                             id={`input-${index}-${key}`}
                             value={item[key]}
                             onChange={(e) => handleItemChange(index, key, e.target.value)}
                             style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                             onFocus={e => e.currentTarget.style.borderColor = 'var(--white)'}
                             onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                           />
                          ) : (
                            <input
                              id={`input-${index}-${key}`}
                              type="text"
                              value={isArray ? item[key].join(', ') : item[key]}
                              onChange={(e) => isArray 
                                ? handleArrayChange(index, key, e.target.value)
                                : handleItemChange(index, key, e.target.value)
                              }
                              style={inputStyle}
                              onFocus={e => e.currentTarget.style.borderColor = 'var(--white)'}
                              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {activeTab !== 'profile' && (
                <button
                  onClick={handleAddNew}
                  style={{
                    width: '100%',
                    padding: '24px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '2px dashed var(--border)',
                    borderRadius: '16px',
                    color: 'var(--text-light)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--white)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-light)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  + ADD NEW {activeTab.toUpperCase().slice(0, activeTab.length - 1)}
                </button>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
