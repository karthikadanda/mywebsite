// Advanced XPRINT Solutions Website JavaScript

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation Links Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Quote Calculator
document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serviceType = document.getElementById('service-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const colors = parseInt(document.getElementById('colors').value);
    const urgency = document.getElementById('urgency').value;
    const designService = document.getElementById('design').checked;
    const delivery = document.getElementById('delivery').checked;
    
    if (!serviceType || !quantity) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Base pricing (in INR)
    let basePrice = 0;
    switch(serviceType) {
        case 'tshirt':
            basePrice = 399;
            break;
        case 'vinyl':
            basePrice = 799;
            break;
        case 'eco':
            basePrice = 1199;
            break;
    }
    
    // Calculate total
    let subtotal = basePrice * quantity;
    
    // Color multiplier
    const colorMultiplier = colors === 1 ? 1 : colors === 2 ? 1.5 : 2;
    subtotal *= colorMultiplier;
    
    // Urgency multiplier
    const urgencyMultiplier = urgency === 'standard' ? 1 : urgency === 'express' ? 1.5 : 2;
    subtotal *= urgencyMultiplier;
    
    // Additional services
    if (designService) subtotal += 3999;
    if (delivery) subtotal += 1599;
    
    // Quantity discount
    if (quantity >= 100) subtotal *= 0.8;
    else if (quantity >= 50) subtotal *= 0.9;
    else if (quantity >= 25) subtotal *= 0.95;
    
    // GST (using 18% for India GST)
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    
    // Display quote
    const quoteResult = document.getElementById('quote-result');
    const quoteDetails = document.getElementById('quote-details');
    
    quoteDetails.innerHTML = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <span class="font-semibold">Service:</span>
                <span>${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Printing</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Quantity:</span>
                <span>${quantity} units</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Colors:</span>
                <span>${colors} color(s)</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Turnaround:</span>
                <span>${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>
            </div>
            ${designService ? '<div class="flex justify-between"><span class="font-semibold">Design Service:</span><span>₹3999</span></div>' : ''}
            ${delivery ? '<div class="flex justify-between"><span class="font-semibold">Delivery:</span><span>₹1599</span></div>' : ''}
            <div class="border-t pt-3 mt-3">
                <div class="flex justify-between">
                    <span class="font-semibold">Subtotal:</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-semibold">GST (18%):</span>
                    <span>₹${tax.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-xl font-bold text-purple-600">
                    <span>Total:</span>
                    <span>₹${total.toFixed(2)}</span>
                </div>
            </div>
            <button onclick="proceedToOrder()" class="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                <i class="fas fa-shopping-cart mr-2"></i>Proceed to Order
            </button>
        </div>
    `;
    
    quoteResult.classList.remove('hidden');
    quoteResult.classList.add('fade-in');
});

// Order Tracking
document.getElementById('tracking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderId = document.getElementById('order-id').value;
    const email = document.getElementById('order-email').value;
    
    if (!orderId || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate order tracking (in real app, this would be an API call)
    const trackingResult = document.getElementById('tracking-result');
    const trackingDetails = document.getElementById('tracking-details');
    
    // Mock order data
    const orderStatuses = [
        { status: 'Order Received', completed: true, date: '2024-01-15 10:30 AM' },
        { status: 'Design Review', completed: true, date: '2024-01-15 2:00 PM' },
        { status: 'Printing', completed: true, date: '2024-01-16 9:00 AM' },
        { status: 'Quality Check', completed: false, date: 'Expected: 2024-01-17 10:00 AM' },
        { status: 'Ready for Pickup', completed: false, date: 'Expected: 2024-01-17 2:00 PM' }
    ];
    
    trackingDetails.innerHTML = `
        <div class="bg-gray-50 rounded-lg p-6">
            <div class="mb-4">
                <h4 class="font-semibold text-lg">Order #${orderId}</h4>
                <p class="text-gray-600">Email: ${email}</p>
            </div>
            <div class="space-y-3">
                ${orderStatuses.map((step, index) => `
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center text-white font-semibold mr-4">
                            ${step.completed ? '<i class="fas fa-check text-sm"></i>' : index + 1}
                        </div>
                        <div class="flex-1">
                            <div class="font-semibold ${step.completed ? 'text-green-600' : 'text-gray-500'}">${step.status}</div>
                            <div class="text-sm text-gray-500">${step.date}</div>
                        </div>
                    </div>
                    ${index < orderStatuses.length - 1 ? '<div class="ml-4 border-l-2 border-gray-300 h-6"></div>' : ''}
                `).join('')}
            </div>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <p class="text-blue-800"><i class="fas fa-info-circle mr-2"></i>Your order is currently in the printing phase. Expected completion: January 17, 2024</p>
            </div>
        </div>
    `;
    
    trackingResult.classList.remove('hidden');
    trackingResult.classList.add('fade-in');
});

// File Upload
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const uploadProgress = document.getElementById('upload-progress');
const progressBar = document.getElementById('progress-bar');
const uploadStatus = document.getElementById('upload-status');
const uploadedFiles = document.getElementById('uploaded-files');
const filesList = document.getElementById('files-list');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-purple-500', 'bg-purple-50');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-purple-500', 'bg-purple-50');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-purple-500', 'bg-purple-50');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/illustrator', 'application/postscript'];
        const maxSize = 50 * 1024 * 1024; // 50MB
        return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    if (validFiles.length === 0) {
        alert('Please upload valid files (PDF, JPG, PNG, AI, EPS) under 50MB');
        return;
    }
    
    uploadFiles(validFiles);
}

function uploadFiles(files) {
    uploadProgress.classList.remove('hidden');
    uploadStatus.textContent = 'Uploading files...';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        uploadStatus.textContent = `Uploading... ${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            uploadStatus.textContent = 'Upload complete!';
            
            setTimeout(() => {
                displayUploadedFiles(files);
                uploadProgress.classList.add('hidden');
                uploadArea.classList.add('hidden');
                uploadedFiles.classList.remove('hidden');
            }, 1000);
        }
    }, 500);
}

function displayUploadedFiles(files) {
    filesList.innerHTML = files.map(file => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
            <div class="flex items-center">
                <i class="fas fa-file text-purple-600 mr-3"></i>
                <div>
                    <div class="font-semibold">${file.name}</div>
                    <div class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
            </div>
            <button onclick="removeFile(this)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function removeFile(button) {
    button.closest('.flex').remove();
    if (filesList.children.length === 0) {
        uploadedFiles.classList.add('hidden');
        uploadArea.classList.remove('hidden');
    }
}

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    const successMessage = document.getElementById('contact-success');
    successMessage.classList.remove('hidden');
    successMessage.classList.add('fade-in');
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
    
    // In a real application, you would send this data to a server
    console.log('Contact form submission:', formData);
});

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        alert('Thank you for subscribing! You will receive updates at: ' + email);
        this.reset();
    }
});

// Gallery Lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="relative max-w-4xl max-h-full">
                <img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full rounded-lg">
                <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Proceed to Order (from quote calculator)
function proceedToOrder() {
    // Scroll to contact section
    scrollToSection('contact');
    
    // Pre-fill some information
    setTimeout(() => {
        const serviceType = document.getElementById('service-type').value;
        if (serviceType) {
            document.getElementById('service').value = serviceType;
        }
    }, 500);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Dynamic pricing updates
document.getElementById('service-type').addEventListener('change', updatePricingDisplay);
document.getElementById('quantity').addEventListener('input', updatePricingDisplay);
document.getElementById('colors').addEventListener('change', updatePricingDisplay);
document.getElementById('urgency').addEventListener('change', updatePricingDisplay);

function updatePricingDisplay() {
    const serviceType = document.getElementById('service-type').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    if (serviceType && quantity) {
        let basePrice = 0;
        switch(serviceType) {
            case 'tshirt':
                basePrice = 399;
                break;
            case 'vinyl':
                basePrice = 799;
                break;
            case 'eco':
                basePrice = 1199;
                break;
        }
        
        // Update display (could add a live preview element)
        console.log(`Base price: ₹${basePrice} x ${quantity} = ₹${basePrice * quantity}`);
    }
}

// Search functionality (for future enhancement)
function searchSite(query) {
    // Implementation for site search
    console.log('Searching for:', query);
}

// Live chat widget (placeholder)
function openLiveChat() {
    alert('Live chat feature coming soon! Please call us at +1 (555) 123-4567 for immediate assistance.');
}

// Print functionality
function printPage() {
    window.print();
}

// Social sharing
function shareOnSocial(platform) {
    const url = window.location.href;
    const text = 'Check out XPRINT Solutions - Premium T-Shirt, Vinyl & Eco-Solvent Printing Services!';
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('XPRINT Solutions website loaded successfully');
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}
