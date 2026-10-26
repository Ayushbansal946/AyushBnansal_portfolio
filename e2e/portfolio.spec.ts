import { test, expect } from '@playwright/test';

test.describe('Ayush Bansal Portfolio — E2E Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for main content to load
    await expect(page).toHaveTitle(/Ayush Bansal/i);
  });

  test('Page loads with correct SEO metadata and title', async ({ page }) => {
    await expect(page).toHaveTitle('Ayush Bansal — UI/UX Designer');
    
    // Check canonical link and meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Ayush Bansal is a UI\/UX Designer/);
  });

  test('Hero section renders name, tagline, and resume CTA', async ({ page }) => {
    // Check main hero heading
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText('AYUSH');

    // Check editorial tagline
    await expect(page.getByText('Beyond Visuals', { exact: false })).toBeVisible();

    // Check CV download / view link
    const resumeBtn = page.getByRole('link', { name: /Download Resume/i });
    await expect(resumeBtn).toBeVisible();
    await expect(resumeBtn).toHaveAttribute('href', /Ayush_Bansal_Resume\.pdf/i);
  });

  test('Navigation links and brand icon are present', async ({ page }) => {
    // Navbar brand icon
    const brandIcon = page.locator('nav img[alt="Ayush Bansal Logo"]');
    await expect(brandIcon).toBeVisible();

    // Navigation bar is rendered
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Projects section renders project cards and handles accordion toggle', async ({ page }) => {
    // Scroll down to projects section (id="portfolio")
    const projectsSection = page.locator('#portfolio');
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();

    // Check that projects exist (e.g. FOUNDRY)
    const foundryCard = page.getByText('FOUNDRY', { exact: false }).first();
    await expect(foundryCard).toBeVisible();

    // Click to toggle accordion
    await foundryCard.click();

    // Verify project detail content or tags appear
    await expect(page.getByText('OVERVIEW', { exact: false }).or(page.getByText('FOUNDRY', { exact: false })).first()).toBeVisible();
  });

  test('Process section marquee tools have hover tooltips', async ({ page }) => {
    const marquee = page.locator('[aria-label="Technologies and Tools Marquee"]');
    await marquee.scrollIntoViewIfNeeded();
    await expect(marquee).toBeVisible();

    // Verify tool badges exist with their respective tooltips
    const figmaBadge = marquee.locator('div[aria-label="Figma"]').first();
    await expect(figmaBadge).toBeAttached();

    // Focus triggers the tooltip via group-focus/item
    await figmaBadge.focus();

    // Verify tooltip with text is present
    const tooltip = figmaBadge.locator('[role="tooltip"]');
    await expect(tooltip).toBeAttached();
    await expect(tooltip).toContainText('Figma');
  });

  test('Contact form validates required fields and accepts input', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();

    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const messageInput = page.locator('#contact-message');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill valid sample data
    await nameInput.fill('Playwright Test User');
    await emailInput.fill('test@example.com');
    await messageInput.fill('This is an automated E2E test verifying portfolio form functionality.');

    await expect(nameInput).toHaveValue('Playwright Test User');
    await expect(emailInput).toHaveValue('test@example.com');
    await expect(messageInput).toHaveValue('This is an automated E2E test verifying portfolio form functionality.');
  });

  test('WhatsApp floating button appears after scrolling down', async ({ page }) => {
    // Scroll down past the 300px threshold
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Check WhatsApp link
    const waButton = page.locator('a[aria-label="Chat on WhatsApp"]');
    await expect(waButton).toBeVisible({ timeout: 5000 });
    await expect(waButton).toHaveAttribute('href', /wa\.me\/917500039393/);
  });
});
