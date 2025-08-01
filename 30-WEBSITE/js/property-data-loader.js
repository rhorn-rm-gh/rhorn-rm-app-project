// Main Data Loader - Clean and Simple Implementation
class PropertyDataLoader {
  constructor() {
    this.propertyData = null;
    this.floorplansData = null;
  }

  async init() {
    try {
      await this.loadAllData();
      this.renderAll();
    } catch (error) {
      console.error('Failed to load property data:', error);
      this.showError();
    }
  }

  async loadAllData() {
    const [propertyResponse, floorplansResponse] = await Promise.all([
      fetch('json/property-data.json'),
      fetch('json/floorplans-data.json')
    ]);

    if (!propertyResponse.ok || !floorplansResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    this.propertyData = await propertyResponse.json();
    this.floorplansData = await floorplansResponse.json();

    console.log('Property data loaded:', this.propertyData);
    console.log('Floor plans data loaded:', this.floorplansData);
  }

  renderAll() {
    this.renderPropertyInfo();
    this.renderDescription();
    this.renderFloorPlans();
    this.renderContactInfo();
    this.renderFooter();
  }

  renderPropertyInfo() {
    const property = this.propertyData.property;
    
    // Header site title
    const siteTitleElement = document.getElementById('property-name');
    if (siteTitleElement) {
      siteTitleElement.textContent = property.name;
    }

    // Update page title
    document.title = `${property.name} | Luxury Apartments`;
  }

  renderDescription() {
    const property = this.propertyData.property;
    const loadingElement = document.getElementById('loading-description');
    const descriptionElement = document.getElementById('property-description');

    if (loadingElement) loadingElement.style.display = 'none';
    
    if (descriptionElement) {
      // Clear any existing content first
      descriptionElement.innerHTML = '';
      
      // Use the pre-formatted HTML description directly
      descriptionElement.innerHTML = `<div style="font-size: 1.1rem; line-height: 1.7;">${property.description}</div>`;
      descriptionElement.style.display = 'block';
    }

    // Clean up any old error elements that might exist
    this.cleanupOldElements();
  }

  renderFloorPlans() {
    const loadingElement = document.getElementById('loading-floorplans');
    const containerElement = document.getElementById('floorplans-container');

    if (loadingElement) loadingElement.style.display = 'none';
    
    if (containerElement && this.floorplansData.floorplans) {
      containerElement.innerHTML = '';

      this.floorplansData.floorplans.forEach(plan => {
        const floorplanCard = this.createFloorPlanCard(plan);
        containerElement.appendChild(floorplanCard);
      });

      containerElement.style.display = 'flex';
    }
  }

  createFloorPlanCard(plan) {
    const col = document.createElement('div');
    col.className = 'col-sm-12 col-md-6 col-lg-4';

    const priceRange = plan.minimumRent === plan.maximumRent 
      ? `$${plan.minimumRent.toLocaleString()}`
      : `$${plan.minimumRent.toLocaleString()}-$${plan.maximumRent.toLocaleString()}`;

    col.innerHTML = `
      <div class="card p-3 border-2 shadow-lg single-shop">
        <div class="card-img-container" style="text-align: center; margin-bottom: 15px;">
          <img src="images/${plan.floorplanImageName}" alt="${plan.floorplanName} floor plan" 
               style="max-width: 100%; height: 150px; object-fit: cover; border-radius: 8px;"
               onerror="this.style.display='none';">
        </div>
        <div class="card-body">
          <h5 class="card-title fw-bold text-black">${plan.floorplanName}</h5>
          <p class="card-text">${plan.beds}Bed/${plan.baths}Bath - ${plan.minimumSQFT}Sq.Ft.</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="text-success fw-bold mb-0" style="font-size: 1.4rem;">${priceRange}</p>
            <a href="${plan.availabilityURL}" target="_blank" rel="noopener" 
               class="btn bg-main text-white">
              Apply <i class="fas fa-home"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    return col;
  }

  renderContactInfo() {
    const property = this.propertyData.property;

    // Address with Google Maps link
    const addressElement = document.getElementById('property-address');
    if (addressElement) {
      const googleMapsUrl = `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
      addressElement.innerHTML = `
        <a href="${googleMapsUrl}" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">
          ${property.address}<br>${property.city}, ${property.state} ${property.zipcode}
          <i class="fas fa-external-link-alt" style="font-size: 0.8rem; margin-left: 5px; opacity: 0.7;"></i>
        </a>
      `;
    }

    // Phone
    const phoneElement = document.getElementById('property-phone');
    if (phoneElement) {
      phoneElement.textContent = property.phone;
    }

    // Email
    const emailElement = document.getElementById('property-email');
    if (emailElement) {
      emailElement.textContent = property.email;
    }
  }

  renderFooter() {
    const property = this.propertyData.property;

    // Footer property name
    const footerNameElement = document.getElementById('footer-property-name');
    if (footerNameElement) {
      footerNameElement.textContent = property.name;
    }

    // Footer address with Google Maps link
    const footerAddressElement = document.getElementById('footer-property-address');
    if (footerAddressElement) {
      const googleMapsUrl = `https://www.google.com/maps?q=${property.latitude},${property.longitude}`;
      footerAddressElement.innerHTML = `
        <a href="${googleMapsUrl}" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">
          ${property.address}<br>${property.city}, ${property.state} ${property.zipcode}<br>${property.phone}
          <i class="fas fa-external-link-alt" style="font-size: 0.8rem; margin-left: 5px; opacity: 0.7;"></i>
        </a>
      `;
    }

    // Footer copyright
    const footerCopyrightElement = document.getElementById('footer-copyright-name');
    if (footerCopyrightElement) {
      footerCopyrightElement.textContent = property.name;
    }
  }

  showError() {
    // Show error in all loading sections
    const loadingElements = [
      'loading-description',
      'loading-floorplans'
    ];

    loadingElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i> Failed to load data. Please refresh the page.';
      }
    });

    // Set fallback text for property name
    const propertyNameElement = document.getElementById('property-name');
    if (propertyNameElement) {
      propertyNameElement.textContent = 'Property Information Unavailable';
    }
  }

  cleanupOldElements() {
    // Remove any old error or loading elements that might conflict
    const oldElementIds = [
      'description-error',
      'description-loading', 
      'loading',
      'description-content',
      'description-paragraphs',
      'description-highlights',
      'description-cta',
      'description-notice'
    ];

    oldElementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const loader = new PropertyDataLoader();
  loader.init();
  
  // Make available globally for debugging
  window.propertyLoader = loader;
});
