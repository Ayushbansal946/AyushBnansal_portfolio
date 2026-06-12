import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LogOut, Save, RefreshCw, Database } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { fallbackProjects, fallbackExperiences, fallbackSkills, fallbackCertificates } from '../data/fallbackData';

type SectionType = 'projects' | 'experiences' | 'skills' | 'certificates';

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
      const snap = await getDocs(collection(db, activeTab));
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort items by num if it exists
      items.sort((a, b) => {
        if (a.num && b.num) return a.num.localeCompare(b.num);
        return 0;
      });
      setData(items);
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
      for (const item of data) {
        if (!item.id) continue;
        const ref = doc(db, activeTab, item.id);
        await setDoc(ref, item);
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
          {(['projects', 'experiences', 'skills', 'certificates'] as SectionType[]).map((tab) => (
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
                  <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.05em', color: 'var(--white)' }}>
                      {item.title || item.role || item.id}
                    </h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                    {Object.keys(item).filter(k => k !== 'id').map(key => {
                      const isArray = Array.isArray(item[key]);
                      const isLongText = typeof item[key] === 'string' && (item[key].length > 60 || key === 'description');
                      
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
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
