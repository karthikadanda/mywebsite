// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('XPRINT Solutions website loaded successfully');
    
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
        
        console.log('Calculator inputs:', { serviceType, quantity, colors, urgency, designService, delivery });
        
        if (!serviceType || !quantity) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Base pricing (in INR)
        let basePrice = 0;
        switch(serviceType) {
            case 'tshirt':
                basePrice = 99;
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
        if (designService) subtotal += 199;
        if (delivery) subtotal += 199;
        
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
                ${designService ? '<div class="flex justify-between"><span class="font-semibold">Design Service:</span><span>199</span></div>' : ''}
                ${delivery ? '<div class="flex justify-between"><span class="font-semibold">Delivery:</span><span>199</span></div>' : ''}
                <div class="border-t pt-3 mt-3">
                    <div class="flex justify-between">
                        <span class="font-semibold">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">GST (18%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xl font-bold text-purple-600">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
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
        const phone = document.getElementById('order-phone').value;
        
        if (!orderId || !phone) {
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
                    <p class="text-gray-600">Phone: ${phone}</p>
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
    
    // Reviews Carousel Functionality
    let currentReview = 0;
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewDots = document.querySelectorAll('.review-dot');
    const totalReviews = 6;

    function updateReviews() {
        const offset = -currentReview * 100;
        reviewsContainer.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        reviewDots.forEach((dot, index) => {
            if (index === currentReview) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-purple-600');
            } else {
                dot.classList.remove('bg-purple-600');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Next review
    document.getElementById('next-review').addEventListener('click', function() {
        currentReview = (currentReview + 1) % totalReviews;
        updateReviews();
    });

    // Previous review
    document.getElementById('prev-review').addEventListener('click', function() {
        currentReview = (currentReview - 1 + totalReviews) % totalReviews;
        updateReviews();
    });

    // Dot navigation
    reviewDots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentReview = parseInt(this.dataset.review);
            updateReviews();
        });
    });

    // Auto-scroll reviews
    setInterval(() => {
        currentReview = (currentReview + 1) % totalReviews;
        updateReviews();
    }, 5000);
});

// Proceed to Order (from quote calculator)
function proceedToOrder() {
    showNotification('Redirecting to order form...', 'info');
    scrollToSection('contact');
}

// Show notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    } text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${
                type === 'success' ? 'check-circle' : 
                type === 'error' ? 'exclamation-circle' : 
                type === 'warning' ? 'exclamation-triangle' : 'info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
