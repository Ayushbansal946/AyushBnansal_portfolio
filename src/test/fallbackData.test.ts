import { describe, it, expect } from 'vitest';
import {
  fallbackProjects,
  fallbackExperiences,
  fallbackSkills,
  fallbackCertificates,
  fallbackProfile,
} from '../data/fallbackData';

describe('Fallback Data Integrity Tests', () => {
  it('should have properly structured projects', () => {
    expect(fallbackProjects.length).toBeGreaterThan(0);
    fallbackProjects.forEach((proj) => {
      expect(proj.id).toBeTruthy();
      expect(proj.num).toMatch(/^\d+$/);
      expect(proj.title).toBeTruthy();
      expect(proj.description).toBeTruthy();
      expect(Array.isArray(proj.images)).toBe(true);
      expect(proj.images.length).toBeGreaterThan(0);
      expect(Array.isArray(proj.tags)).toBe(true);
    });
  });

  it('should have properly structured experiences', () => {
    expect(fallbackExperiences.length).toBeGreaterThan(0);
    fallbackExperiences.forEach((exp) => {
      expect(exp.id).toBeTruthy();
      expect(exp.date).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(Array.isArray(exp.bullets)).toBe(true);
      expect(exp.bullets.length).toBeGreaterThan(0);
    });
  });

  it('should have properly structured skills', () => {
    expect(fallbackSkills.length).toBeGreaterThan(0);
    fallbackSkills.forEach((skill) => {
      expect(skill.id).toBeTruthy();
      expect(skill.title).toBeTruthy();
      expect(Array.isArray(skill.skills)).toBe(true);
      expect(skill.skills.length).toBeGreaterThan(0);
    });
  });

  it('should have valid certificates with URLs', () => {
    expect(fallbackCertificates.length).toBeGreaterThan(0);
    fallbackCertificates.forEach((cert) => {
      expect(cert.id).toBeTruthy();
      expect(cert.title).toBeTruthy();
      expect(cert.issuer).toBeTruthy();
      expect(cert.fileUrl).toBeTruthy();
    });
  });

  it('should have valid profile contact information', () => {
    expect(fallbackProfile.email).toBe('ayushbansal946@gmail.com');
    expect(fallbackProfile.phone).toContain('7500039393');
    expect(fallbackProfile.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com/);
    expect(fallbackProfile.behance).toMatch(/^https:\/\/(www\.)?behance\.net/);
  });
});
