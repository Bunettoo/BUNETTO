
        // --- HERO CAROUSEL ---
        let currentHeroSlide = 0;
        let heroInterval;

        function setHeroSlide(index) {
            const slides = document.querySelectorAll('.hero-carousel-item');
            const dots = document.querySelectorAll('#hero-carousel .rounded-full');
            
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => {
                d.classList.remove('bg-gold-400', 'w-8');
                d.classList.add('bg-white/30', 'w-4');
            });

            currentHeroSlide = index;
            slides[currentHeroSlide].classList.add('active');
            dots[currentHeroSlide].classList.add('bg-gold-400', 'w-8');
            dots[currentHeroSlide].classList.remove('bg-white/30', 'w-4');

            // Reset Interval
            clearInterval(heroInterval);
            startHeroAutoRotate();
        }

        function startHeroAutoRotate() {
            heroInterval = setInterval(() => {
                let next = (currentHeroSlide + 1) % 3;
                setHeroSlide(next);
            }, 5000);
        }

        // --- MENU DATA ---
        // Extras removed per user instructions
        let menuData;

        let signatureIds;
        let allProducts = [];
        
        let cart = [];
        const WHATSAPP_NUMBER = "923000000000"; // TODO: Replace with your WhatsApp number (country code + number, no +)

        // --- DYNAMIC LAYOUT CONFIG ---
        let categoryConfig;

        // --- DYNAMIC RENDERING ---
        function renderCategoryNav() {
            const navContainer = document.getElementById('category-nav');
            let html = '';
            categoryConfig.forEach(cat => {
                html += `<a href="#menu-${cat.id}" class="snap-start shrink-0 px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[13px] md:text-sm font-semibold text-gray-700 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors whitespace-nowrap">${cat.title}</a>`;
            });
            navContainer.innerHTML = html;
        }

        function renderAllCategories() {
            const container = document.getElementById('menu-container');
            let html = '';

            categoryConfig.forEach((cat, index) => {
                const borderClass = index > 0 ? 'border-t border-gray-200' : '';
                
                // Tighter Spacing applied here: py-8 instead of py-16, mb-4 instead of mb-10
                const headerHtml = `
                    <div class="flex justify-between items-end mb-4 border-b border-gray-100 pb-3 reveal-text">
                        <div>
                            <p class="text-gold-500 tracking-[0.2em] text-[10px] font-bold uppercase mb-1">${cat.subtitle}</p>
                            <h2 class="text-2xl md:text-4xl font-serif font-bold text-gray-900">${cat.title}</h2>
                        </div>
                        <button onclick="openViewAll('${cat.id}')" class="text-gold-500 uppercase text-[10px] md:text-xs tracking-widest font-bold hover:text-gray-900 transition-colors flex items-center gap-1 group bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                            View All
                            <svg width="14" height="14" viewBox="0 0 256 256" class="transform group-hover:translate-x-1 transition-transform"><path fill="currentColor" d="M221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"/></svg>
                        </button>
                    </div>
                `;

                if (cat.type === 'carousel') {
                    html += `
                    <section id="menu-${cat.id}" class="py-8 relative ${borderClass}">
                        <div class="max-w-7xl mx-auto px-4 lg:px-8">
                            ${headerHtml}
                            <div class="relative w-[100vw] -ml-[50vw] left-1/2 py-2">
                                <button onclick="scrollCarousel('${cat.id}', -1)" class="absolute left-1 sm:left-3 md:left-[5vw] lg:left-[10vw] top-1/2 -translate-y-1/2 z-[60] w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white text-gold-500 flex items-center justify-center shadow-md active:scale-90 transition-transform">
                                    <svg width="20" height="20" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z"/></svg>
                                </button>
                                <div id="track-${cat.id}" class="carousel-track"></div>
                                <button onclick="scrollCarousel('${cat.id}', 1)" class="absolute right-1 sm:right-3 md:right-[5vw] lg:right-[10vw] top-1/2 -translate-y-1/2 z-[60] w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 bg-white text-gold-500 flex items-center justify-center shadow-md active:scale-90 transition-transform">
                                    <svg width="20" height="20" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </section>`;
                } else if (cat.type === 'grid') {
                    html += `
                    <section id="menu-${cat.id}" class="py-8 relative ${borderClass}">
                        <div class="max-w-7xl mx-auto px-4 lg:px-8">
                            ${headerHtml}
                            <div id="grid-${cat.id}" class="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory no-scrollbar"></div>
                        </div>
                    </section>`;
                } else if (cat.type === 'list') {
                    html += `
                    <section id="menu-${cat.id}" class="py-8 relative bg-gray-50 ${borderClass}">
                        <div class="max-w-4xl mx-auto px-6 lg:px-8">
                            <div class="text-center mb-6 reveal-text">
                                <p class="text-gold-500 tracking-[0.2em] text-[10px] font-bold uppercase mb-1">${cat.subtitle}</p>
                                <h2 class="text-3xl md:text-4xl font-serif font-bold text-gray-900">${cat.title}</h2>
                                <div class="w-12 h-1 bg-gold-gradient mx-auto mt-3"></div>
                            </div>
                            <div class="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-md">
                                <div id="list-${cat.id}" class="flex flex-col"></div>
                            </div>
                        </div>
                    </section>`;
                }
            });

            container.innerHTML = html;

            categoryConfig.forEach(cat => {
                if (cat.type === 'carousel') initNativeCarousel(cat.id);
                else if (cat.type === 'grid') renderGrid(cat.id);
                else if (cat.type === 'list') renderList(cat.id);
            });
        }

        // --- CART UI ENGINE ---
        function triggerPopBadge() {
            const countBadge = document.getElementById('cart-count');
            countBadge.classList.remove('animate-badge-pop');
            void countBadge.offsetWidth;
            countBadge.classList.add('animate-badge-pop');
            
            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            if (totalItems > 0) countBadge.classList.remove('scale-0');
            else countBadge.classList.add('scale-0');
        }

        function spawnParticle(event, text) {
            if(!event) return;
            const el = document.createElement('div');
            el.className = 'particle text-gold-500 font-bold text-xl fixed z-[9999] pointer-events-none drop-shadow-md';
            el.textContent = text;
            
            // Accurately capture click or touch event position for floating particle
            const x = event.clientX || (event.touches && event.touches[0].clientX) || window.innerWidth / 2;
            const y = event.clientY || (event.touches && event.touches[0].clientY) || window.innerHeight / 2;
            
            el.style.left = `${x - 10}px`;
            el.style.top = `${y - 20}px`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 800); 
        }

        function getCartButtonHTML(id) {
            const instances = cart.filter(c => c.id === id);
            const totalQty = instances.reduce((sum, item) => sum + item.qty, 0);

            if (totalQty > 0) {
                const targetInstanceId = instances[0].instanceId;
                return `
                    <div class="flex items-center bg-gold-gradient rounded-full h-10 px-1 shadow-md text-white z-20 transition-all border border-gold-500" onclick="event.stopPropagation()">
                        <button onclick="updateQuantity('${targetInstanceId}', -1, event)" class="w-8 h-8 flex items-center justify-center font-bold hover:bg-black/10 rounded-full transition-colors active:scale-90">
                            <svg width="14" height="14" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M216 136H40a8 8 0 0 1 0-16h176a8 8 0 0 1 0 16Z"/></svg>
                        </button>
                        <span class="w-7 text-center font-bold text-sm select-none">${totalQty}</span>
                        <button onclick="updateQuantity('${targetInstanceId}', 1, event)" class="w-8 h-8 flex items-center justify-center font-bold hover:bg-black/10 rounded-full transition-colors active:scale-90">
                            <svg width="14" height="14" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M216 120h-80V40a8 8 0 0 0-16 0v80H40a8 8 0 0 0 0 16h80v80a8 8 0 0 0 16 0v-80h80a8 8 0 0 0 0-16Z"/></svg>
                        </button>
                    </div>
                `;
            } else {
                return `
                    <button onclick="addToCart('${id}', event)" class="w-full bg-gold-gradient text-white text-[10px] md:text-xs font-bold py-2 md:py-2.5 px-4 rounded-full uppercase tracking-wider transition-all shadow-sm z-20 active:scale-95 whitespace-nowrap">
                        Add to Cart
                    </button>
                `;
            }
        }

        function syncCartButtons() {
            document.querySelectorAll('.cart-btn-wrapper').forEach(wrapper => {
                wrapper.innerHTML = getCartButtonHTML(wrapper.getAttribute('data-id'));
            });
        }

        // --- HTML TEMPLATES ---
        function generateGridItemHTML(product) {
            const descHtml = product.desc ? `<p class="text-[9px] md:text-xs text-gray-500 line-clamp-1 md:line-clamp-2 mt-1 leading-tight">${product.desc}</p>` : '';
            return `
                <div class="menu-card bg-white border border-gray-100 p-2 md:p-4 rounded-lg md:rounded-xl relative flex flex-col h-full shadow-sm cursor-pointer w-full overflow-hidden" onclick="addToCart('${product.id}', event)">
                    <div class="h-20 sm:h-32 md:h-40 overflow-hidden mb-2 relative rounded-md shrink-0">
                        <img src="${product.img}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="font-serif text-[11px] sm:text-[14px] md:text-[17px] text-gray-900 font-bold line-clamp-1 md:line-clamp-2 leading-tight">${product.name}</h3>
                            ${descHtml}
                        </div>
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 pt-2 border-t border-gray-100 gap-1">
                            ${product.discountPrice ? '<span class="text-gray-400 line-through text-[9px] sm:text-[10px] mr-1">Rs.' + product.price + '</span><span class="text-gold-600 font-bold text-[10px] sm:text-xs md:text-base tracking-wide">Rs.' + product.discountPrice + '</span>' : '<span class="text-gold-600 font-bold text-[10px] sm:text-xs md:text-base tracking-wide">Rs. ' + product.price + '</span>'}
                            <div class="cart-btn-wrapper flex justify-end" data-id="${product.id}" onclick="event.stopPropagation()"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        function generateCardWrap(product) {
            const descHtml = product.desc ? `<p class="text-xs text-gray-500 line-clamp-2 mt-1 leading-snug">${product.desc}</p>` : '';
            return `
                <div class="carousel-item-wrap w-[220px] md:w-[300px]">
                    <div class="menu-card bg-white border border-gray-100 p-3 md:p-4 rounded-xl relative flex flex-col h-[350px] md:h-[380px] shadow-md mx-auto w-full cursor-pointer" onclick="addToCart('${product.id}', event)">
                        <div class="h-32 md:h-40 overflow-hidden mb-3 relative rounded-lg shrink-0">
                            <img src="${product.img}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 flex flex-col justify-between pointer-events-auto">
                            <div>
                                <h3 class="font-serif text-[16px] md:text-[18px] text-gray-900 font-bold line-clamp-2 leading-snug">${product.name}</h3>
                                ${descHtml}
                            </div>
                            <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                ${product.discountPrice ? '<span class="text-gray-400 line-through text-xs mr-2">Rs.' + product.price + '</span><span class="text-gold-600 font-bold text-base tracking-wide">Rs.' + product.discountPrice + '</span>' : '<span class="text-gold-600 font-bold text-base tracking-wide">Rs. ' + product.price + '</span>'}
                                <div class="cart-btn-wrapper flex justify-end" data-id="${product.id}" onclick="event.stopPropagation()"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

    function generateListItemHTML(product, isLast) {
        const descHtml = product.desc ? `<p class="text-[11px] md:text-xs text-gray-500 line-clamp-1 mt-0.5">${product.desc}</p>` : '';
        return `
            <div class="flex items-center gap-3 md:gap-4 py-3 md:py-4 ${!isLast ? 'border-b border-gray-100' : ''} rounded-lg px-1 md:px-2 cursor-pointer" onclick="addToCart('${product.id}', event)">
                <div class="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                    <img src="${product.img}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover rounded-md border border-gray-200 shadow-sm">
                </div>
                <div class="flex-1">
                    <h4 class="text-gray-900 font-serif text-sm md:text-base font-bold">${product.name}</h4>
                    ${descHtml}
                    ${product.discountPrice ? '<p class="mt-0.5"><span class="text-gray-400 line-through text-[10px] sm:text-xs mr-2">Rs.' + product.price + '</span><span class="text-gold-600 font-bold text-xs md:text-sm">Rs.' + product.discountPrice + '</span></p>' : '<p class="text-gold-600 font-bold text-xs md:text-sm mt-0.5">Rs. ' + product.price + '</p>'}
                </div>
                <div class="cart-btn-wrapper flex justify-end items-center shrink-0" data-id="${product.id}" onclick="event.stopPropagation()"></div>
            </div>
        `;
    }

    function generateDealItemHTML(deal) {
        return `
            <div class="deal-card cursor-pointer" onclick="addToCart('${deal.id}', event)">
                <div>
                    <span class="deal-badge">Special Offer</span>
                    <h3 class="text-2xl font-serif font-bold text-gray-900 mb-2">${deal.name}</h3>
                    <ul class="deal-items-list">
                        ${deal.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <span class="text-gold-600 font-bold text-xl tracking-tight">Rs. ${deal.price}</span>
                    <div class="cart-btn-wrapper" data-id="${deal.id}" onclick="event.stopPropagation()"></div>
                </div>
            </div>
        `;
    }

        // --- ENGINES ---
        function initNativeCarousel(categoryId) {
            const track = document.getElementById(`track-${categoryId}`);
            const items = menuData[categoryId];
            
            const repeatedItems = [...items, ...items, ...items, ...items];
            track.innerHTML = repeatedItems.map(p => generateCardWrap(p)).join('');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('active');
                    else entry.target.classList.remove('active');
                });
            }, { root: track, threshold: 0.6 });

            track.querySelectorAll('.carousel-item-wrap').forEach(el => observer.observe(el));

            let interval = setInterval(() => scrollCarousel(categoryId, 1), 3500);
            
            track.addEventListener('mouseenter', () => clearInterval(interval));
            track.addEventListener('mouseleave', () => {
                clearInterval(interval);
                interval = setInterval(() => scrollCarousel(categoryId, 1), 3500);
            });
            track.addEventListener('touchstart', () => clearInterval(interval), {passive: true});

            let isResetting = false;
            track.addEventListener('scroll', () => {
                if(track.children.length < 2 || isResetting) return;
                
                const singleItemWidth = track.children[1].offsetLeft - track.children[0].offsetLeft;
                const setWidth = items.length * singleItemWidth;
                
                if (setWidth <= 0) return; 
                
                if (track.scrollLeft > setWidth * 2.5) {
                    isResetting = true;
                    track.style.scrollBehavior = 'auto';
                    track.scrollLeft -= setWidth;
                    requestAnimationFrame(() => {
                        track.style.scrollBehavior = 'smooth';
                        isResetting = false;
                    });
                }
                else if (track.scrollLeft < setWidth * 0.5) {
                    isResetting = true;
                    track.style.scrollBehavior = 'auto';
                    track.scrollLeft += setWidth;
                    requestAnimationFrame(() => {
                        track.style.scrollBehavior = 'smooth';
                        isResetting = false;
                    });
                }
            });

            setTimeout(() => {
                const singleItemWidth = track.children.length > 1 ? Math.max(track.children[1].offsetLeft - track.children[0].offsetLeft, 220) : 220;
                track.style.scrollBehavior = 'auto';
                track.scrollLeft = (items.length * 2) * singleItemWidth; 
                requestAnimationFrame(() => track.style.scrollBehavior = 'smooth');
            }, 300);
        }

        function scrollCarousel(categoryId, direction) {
            const track = document.getElementById(`track-${categoryId}`);
            if(!track.children.length) return;
            const cardWidthWithGap = track.children[1].offsetLeft - track.children[0].offsetLeft;
            track.scrollBy({ left: direction * cardWidthWithGap, behavior: 'smooth' });
        }

        function renderGrid(categoryId) {
            const container = document.getElementById(`grid-${categoryId}`);
            let html = '';
            menuData[categoryId].forEach(p => { html += generateGridItemHTML(p); });
            container.innerHTML = html;
        }

        function renderList(categoryId) {
            const container = document.getElementById(`list-${categoryId}`);
            let html = '';
            const items = menuData[categoryId];
            items.forEach((p, idx) => { html += generateListItemHTML(p, idx === items.length - 1); });
            container.innerHTML = html;
        }

    function renderSignature() {
        const container = document.getElementById('list-signature');
        let html = '';
        signatureIds.forEach((id) => {
            const p = allProducts.find(x => x.id === id);
            if (p) html += generateGridItemHTML(p);
        });
        container.innerHTML = html;
    }

    function renderDeals() {
        const container = document.getElementById('list-deals');
        if (!container) return;
        let html = '';
        const deals = menuData['deals'] || [];
        deals.forEach(deal => {
            html += generateDealItemHTML(deal);
        });
        container.innerHTML = html;
    }

        function openViewAll(categoryId) {
            const modal = document.getElementById('view-all-modal');
            const grid = document.getElementById('modal-grid');
            const cat = categoryConfig.find(c => c.id === categoryId);
            document.getElementById('modal-title').textContent = cat ? cat.title : 'Collection';
            
            grid.innerHTML = menuData[categoryId].map(p => generateGridItemHTML(p)).join('');
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            syncCartButtons(); 
        }

        function closeViewAll() {
            document.getElementById('view-all-modal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }


        // --- DIRECT ADD TO CART ---
        function addToCart(productId, event) {
            if(event) event.stopPropagation();
            const product = allProducts.find(p => p.id === productId);
            if(product) {
                const itemIndex = cart.findIndex(item => item.id === productId && item.extras.length === 0);
                if (itemIndex > -1) {
                    cart[itemIndex].qty += 1;
                } else {
                    cart.push({ 
                        ...product, 
                        instanceId: 'inst_' + Date.now() + Math.random(),
                        qty: 1, 
                        extras: [] 
                    });
                }
                spawnParticle(event, '+1');
            }
            updateCartUI();
        }

        function updateQuantity(instanceId, delta, event) {
            if(event) event.stopPropagation();
            const itemIndex = cart.findIndex(item => item.instanceId === instanceId);
            if (itemIndex > -1) {
                cart[itemIndex].qty += delta;
                spawnParticle(event, delta > 0 ? '+1' : '-1');
                if (cart[itemIndex].qty <= 0) cart.splice(itemIndex, 1);
                updateCartUI();
            }
        }

        function saveCart() {
            localStorage.setItem('bunetto_cart', JSON.stringify(cart));
        }

        function loadCart() {
            const savedCart = localStorage.getItem('bunetto_cart');
            if (savedCart) {
                try {
                    cart = JSON.parse(savedCart);
                } catch (e) {
                    console.error("Error loading cart from localStorage", e);
                    cart = [];
                }
            }
        }

        function updateCartUI() {
            const container = document.getElementById('cart-items');
            const totalEl = document.getElementById('cart-total');
            const countEl = document.getElementById('cart-count');
            const orderType = document.getElementById('order-type').value;
            const deliveryFeeRow = document.getElementById('delivery-fee-row');

            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            countEl.textContent = totalItems;
            triggerPopBadge(); 

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 pt-20">
                        <svg width="50" height="50" viewBox="0 0 256 256" class="opacity-30"><path fill="currentColor" d="M216 64h-40v-8a48 48 0 0 0-96 0v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16Zm-120-8a32 32 0 0 1 64 0v8H96Zm120 152H40V80h176v128Z"/></svg>
                        <p class="text-xs uppercase tracking-widest font-bold">Your order is empty.</p>
                    </div>
                `;
                totalEl.textContent = "Rs. 0";
                deliveryFeeRow.classList.add('hidden');
            } else {
                let total = 0;
                let deliveryFee = 0;
                container.innerHTML = '';

            cart.forEach(item => {
                let itemBaseTotal = (item.discountPrice || item.price) * item.qty;
                let extrasTotal = item.extras.reduce((sum, ex) => sum + (ex.price * ex.qty * item.qty), 0);
                let rowTotal = itemBaseTotal + extrasTotal;
                total += rowTotal;

                let extrasHtml = '';
                if (item.extras.length > 0) {
                    extrasHtml = `
                        <div class="mt-2 ml-4 border-l-2 border-gold-200 pl-3 space-y-1">
                            ${item.extras.map(ex => `
                                <div class="text-[10px] md:text-xs text-gray-500 flex justify-between items-center">
                                    <span>• ${ex.qty}x ${ex.name} (+Rs. ${ex.price * ex.qty})</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                // Sub-items for deals
                let contentsHtml = '';
                if (item.items && item.items.length > 0) {
                    contentsHtml = `
                        <div class="mt-2 ml-4 border-l-2 border-gold-400 pl-3 space-y-1">
                            ${item.items.map(content => `
                                <div class="text-[10px] md:text-xs text-gray-600 italic flex items-center gap-1">
                                    <span>• ${content}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                const visualElement = item.img ? 
                    `<img src="${item.img}" class="w-14 h-14 object-cover rounded-md border border-gray-100">` :
                    `<div class="w-14 h-14 bg-gold-50 flex items-center justify-center rounded-md border border-gold-100 text-gold-600 font-bold text-[10px] uppercase">Deal</div>`;

                container.innerHTML += `
                    <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div class="flex gap-3 items-center">
                            ${visualElement}
                            <div class="flex-1">
                                ${item.items ? '<span class="cart-deal-badge">Special Deal</span>' : ''}
                                <h4 class="text-gray-900 font-serif text-sm font-bold leading-tight line-clamp-1">${item.name}</h4>
                                <div class="text-gold-600 text-xs mt-0.5 font-bold">Rs. ${item.discountPrice || item.price}</div>
                                
                                <div class="flex items-center gap-2 mt-2">
                                    <button onclick="updateQuantity('${item.instanceId}', -1, event)" class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors active:scale-90">
                                        <svg width="10" height="10" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M216 136H40a8 8 0 0 1 0-16h176a8 8 0 0 1 0 16Z"/></svg>
                                    </button>
                                    <span class="text-xs w-4 text-center text-gray-900 font-bold">${item.qty}</span>
                                    <button onclick="updateQuantity('${item.instanceId}', 1, event)" class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors active:scale-90">
                                        <svg width="10" height="10" viewBox="0 0 256 256" class="pointer-events-none"><path fill="currentColor" d="M216 120h-80V40a8 8 0 0 0-16 0v80H40a8 8 0 0 0 0 16h80v80a8 8 0 0 0 16 0v-80h80a8 8 0 0 0 0-16Z"/></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-gray-900 font-bold text-sm">Rs. ${rowTotal}</div>
                            </div>
                        </div>
                        ${contentsHtml}
                        ${extrasHtml}
                    </div>
                `;
            });

                if (orderType === 'delivery') {
                    deliveryFee = 150;
                    deliveryFeeRow.classList.remove('hidden');
                } else {
                    deliveryFeeRow.classList.add('hidden');
                }

                total += deliveryFee;
                totalEl.textContent = `Rs. ${total}`;
            }
            syncCartButtons();
            saveCart();
        }

        function toggleCart() {
            const drawer = document.getElementById('cart-drawer');
            const backdrop = document.getElementById('cart-backdrop');
            drawer.classList.toggle('active');
            backdrop.classList.toggle('active');
            if(drawer.classList.contains('active')) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = 'auto';
        }

        function checkoutWhatsApp() {
            if (cart.length === 0) {
                alert("Please add items to your order first.");
                return;
            }

            const orderType = document.getElementById('order-type').value;
            const orderTypeLabel = orderType === 'delivery' ? 'Delivery' : 'Pickup';

            let message = `Hello *Bunetto*! 🍔✨\nI'd like to place a *${orderTypeLabel}* order:\n\n`;
            let total = 0;

            cart.forEach(item => {
                let itemBaseTotal = (item.discountPrice || item.price) * item.qty;
                let extrasTotal = item.extras.reduce((sum, ex) => sum + (ex.price * ex.qty * item.qty), 0);
                let rowTotal = itemBaseTotal + extrasTotal;
                total += rowTotal;

                message += `🍔 *${item.qty}x ${item.name}* - Rs. ${itemBaseTotal}\n`;
                if (item.items) {
                    item.items.forEach(content => {
                        message += `  └─ ${content}\n`;
                    });
                }
                item.extras.forEach(ex => {
                    message += `  └─ ${ex.qty * item.qty}x ${ex.name} (+Rs. ${ex.price * ex.qty * item.qty})\n`;
                });
            });

            if (orderType === 'delivery') {
                message += `▪ Delivery Fee - Rs. 150\n`;
                total += 150;
            }

            message += `\n*Total Amount: Rs. ${total}*\n\n`;
            
            if (orderType === 'delivery') {
                message += "Please let me know how I can make the payment and the estimated delivery time. Here is my delivery address:\n\n[Please enter your address here]\n\nThank you!";
            } else {
                message += "Please let me know how I can make the payment and when my order will be ready for pickup. Thank you!";
            }

            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
        }

        function handleScroll() {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 30) nav.classList.add('nav-scrolled', 'py-2'), nav.classList.remove('py-4');
            else nav.classList.remove('nav-scrolled', 'py-2'), nav.classList.add('py-4');
        }

        window.addEventListener('DOMContentLoaded', () => {

        const data = {
            "menuData": {
                "beef": [
                    { "id": "beef1", "name": "Classic Beef Burger", "desc": "Juicy grilled beef patty, fresh lettuce, tomatoes, onions, creamy mayo & signature house sauce", "price": 499, "img": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" },
                    { "id": "beef2", "name": "Beef Cheese Supreme", "desc": "Beef layer, cheese, caramelized onions & rich creamy sauce", "price": 600, "img": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop" },
                    { "id": "beef3", "name": "Bunetto Megaton", "desc": "Double patties, double cheese, crispy onions & fully loaded signature sauces", "price": 900, "img": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop" }
                ],
                "stuffed": [
                    { "id": "stf1", "name": "Bunetto Signature Stuffed", "desc": "Stuffed beef patty, molten cheese, jalapeños & signature sauces", "price": 650, "img": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop" },
                    { "id": "stf2", "name": "Chicken Melt Stuffed", "desc": "Crispy chicken stuffed with melted cheese, lettuce & creamy mayo", "price": 600, "img": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop" }
                ],
                "smash": [
                    { "id": "sm1", "name": "Beef Smash Bites", "desc": "Smashed beef patty with cheese, pickles & smash sauce", "price": 650, "img": "images/smash_bites.png" },
                    { "id": "sm2", "name": "Shroom Smash", "desc": "Beef smash topped with sautéed mushrooms, cheese & creamy garlic sauce", "price": 700, "img": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop" },
                    { "id": "sm3", "name": "Onion Bliss Smash", "desc": "Beef patty, caramelized onions, cheese & smoky rich flavor", "price": 750, "img": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" }
                ],
                "chicken": [
                    { "id": "chk1", "name": "Bunetto Crunchy Core", "desc": "Golden fried chicken with lettuce & creamy mayo", "price": 450, "img": "images/crunchy burger.jpg" },
                    { "id": "chk2", "name": "Twin Patty Burger", "desc": "Two crispy chicken patties, cheese, fresh veggies & creamy sauce", "price": 620, "img": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop" }
                ],
                "grill": [
                    { "id": "gr1", "name": "Grill X", "desc": "Flame-grilled beef patty, crisp lettuce, cheese, fresh tomatoes, pickles, creamy mayo & signature grill sauce", "price": 600, "img": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop" },
                    { "id": "gr2", "name": "Shroom X", "desc": "Flame-grilled beef patties, mushrooms, melted cheese, fresh lettuce, creamy mushroom sauce & garlic mayo", "price": 720, "img": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop" },
                    { "id": "gr3", "name": "Charcoal Beast", "desc": "Double flame-grilled beef patties, cheese, caramelized onions, crisp lettuce, smoky BBQ & signature beast sauce", "price": 950, "img": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" }
                ],
                "zinger": [
                    { "id": "zg1", "name": "Crunch Zing", "desc": "Crispy fillet with lettuce & mayo", "price": 450, "img": "images/crunchy burger.jpg" },
                    { "id": "zg2", "name": "Smoky Zing", "desc": "Zinger with BBQ sauce & creamy mayo", "price": 500, "img": "images/smoky_zing.png" },
                    { "id": "zg3", "name": "Bunetto Mighty Zing", "desc": "Cheese, jalapeños & signature sauces with extra crunch", "price": 700, "img": "images/mighty zinger.jpg" },
                    { "id": "zg4", "name": "Double Trouble", "desc": "One juicy beef patty & one crispy zinger fillet, double cheese, fresh veggies & signature sauces", "price": 1000, "img": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop" }
                ],
                "sandwiches": [
                    { "id": "sd1", "name": "Fire Cluck", "desc": "Spicy grilled chicken with fiery sauce & lettuce", "price": 500, "img": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop" },
                    { "id": "sd2", "name": "Crispy Cluck", "desc": "Crispy chicken strips with mayo & fresh lettuce", "price": 550, "img": "images/crispy_cluck.png" },
                    { "id": "sd3", "name": "Cheese Cluck", "desc": "Chicken fillet with melted cheese & creamy sauce", "price": 650, "img": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop" }
                ],
                "fries": [
                    { "id": "fr1", "name": "Fire Fries", "desc": "Crispy fries tossed in spicy seasoning", "price": 200, "img": "images/fire_fries.png" },
                    { "id": "fr2", "name": "Garlic Boss Fries", "desc": "Loaded with creamy garlic sauce & herbs", "price": 300, "img": "images/garlic_fries.png" },
                    { "id": "fr3", "name": "Zesty Chicken Fries", "desc": "Crispy chicken strips with zesty dip & fries", "price": 600, "img": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=600&auto=format&fit=crop" },
                    { "id": "fr4", "name": "Bunetto Special Sauce Fries", "desc": "Fries loaded with Bunetto special sauce", "price": 500, "img": "images/sauce fries.jpg" }
                ],
                "wings": [
                    { "id": "wg1", "name": "Crispy Wings", "desc": "Perfectly fried wings with mild seasoning", "price": 480, "img": "https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?q=80&w=600&auto=format&fit=crop" },
                    { "id": "wg2", "name": "Buffalo Wings", "desc": "Juicy wings tossed in buffalo sauce", "price": 550, "img": "images/Buffalo wings.jpg" },
                    { "id": "wg3", "name": "Dynamic Chicken", "desc": "Crispy chicken pieces with signature spices", "price": 450, "img": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop" }
                ],
                "beverages": [
                    { "id": "d1", "name": "Water (500ml)", "desc": "", "price": 100, "img": "images/water.png" },
                    { "id": "d2", "name": "Dew (345ml)", "desc": "", "price": 110, "img": "images/dew.jpg"},
                    { "id": "d3", "name": "Pepsi (345ml)", "desc": "", "price": 110, "img": "images/pepsi.jpg" },
                    { "id": "d4", "name": "7up (345ml)", "desc": "", "price": 110, "img": "images/7up.jpg" }
                ],
                "extras": [
                    { "id": "ex_sauce", "name": "Extra Sauce", "desc": "", "price": 100, "img": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=600&auto=format&fit=crop" },
                    { "id": "ex_cheese", "name": "Cheese Slice", "desc": "", "price": 70, "img": "https://images.unsplash.com/photo-1623653387945-2fd2540d9c49?q=80&w=600&auto=format&fit=crop" }
                ],
                "deals": [
                    { "id": "deal01", "name": "Deal 01", "items": ["Beef smash bites", "Colddrink × 2", "Fire cluck (With fire fries)"], "price": 1199 },
                    { "id": "deal02", "name": "Deal 02", "items": ["Crunchy zing", "Fire fries", "Colddrink"], "price": 699 },
                    { "id": "deal03", "name": "Deal 03", "items": ["Classic beef burger", "Shroom smash", "Crispy wings", "Smoky zing", "2 colddrink with fries"], "price": 2299 },
                    { "id": "deal04", "name": "Deal 04", "items": ["Beef cheese supreme", "Bunetto Mighty zing", "Grill X", "Bunetto core", "Cheessy cluck", "Bunetto special sauce fries"], "price": 3199 },
                    { "id": "deal05", "name": "Deal 05", "items": ["Crunchy zing x2", "Fire cluck x2", "Bunetto core x2", "Chicken melt stuffed x2", "Crispy wings", "Garlic Boss fries x2", "Cold drinks x4"], "price": 4999 }
                ]
            },
            "signatureIds": ["beef3", "gr3", "zg4", "zg3", "fr4", "sd3"],
            "categoryConfig": [
                { "id": "beef", "subtitle": "Classics & Supremes", "title": "Beef Burgers", "group": "burger" },
                { "id": "stuffed", "subtitle": "Oozing Goodness", "title": "Stuffed Burgers", "group": "burger" },
                { "id": "smash", "subtitle": "Crispy Edges", "title": "Beef Smash Burgers", "group": "burger" },
                { "id": "chicken", "subtitle": "Crispy & Tender", "title": "Chicken Burgers", "group": "burger" },
                { "id": "grill", "subtitle": "Flame Grilled", "title": "Grill Burgers", "group": "burger" },
                { "id": "zinger", "subtitle": "Ultimate Crunch", "title": "Zinger Burgers", "group": "burger" },
                { "id": "sandwiches", "subtitle": "Cluckin Good", "title": "Chicken Sandwiches", "group": "burger" },
                { "id": "fries", "subtitle": "Perfect Additions", "title": "Fries & Sides", "group": "fries" },
                { "id": "wings", "subtitle": "Finger Lickin", "title": "Wings & Chicken", "group": "wings" },
                { "id": "beverages", "subtitle": "Refreshments", "title": "Cold Beverages", "group": "beverages" }
            ]
        };

        menuData = data.menuData;
        signatureIds = data.signatureIds;
        categoryConfig = data.categoryConfig;
        allProducts = Object.values(menuData).flat();

        categoryConfig.forEach(cat => {
            const count = menuData[cat.id]?.length || 0;
            if (cat.id === 'beverages') cat.type = 'list';
            else if (cat.id === 'zinger' || cat.id === 'fries') cat.type = 'carousel';
            else if (count > 4) cat.type = 'carousel';
            else if (count === 4) cat.type = 'grid';
            else cat.type = 'list';
        });

        // Initialize Dynamic Content Engine
        renderCategoryNav();
        renderAllCategories();
        renderSignature();
        renderDeals();
        loadCart();
        updateCartUI();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

        startHeroAutoRotate();
        window.addEventListener('scroll', handleScroll);
        });

    