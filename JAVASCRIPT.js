 <!-- JAVASCRIPT FOLDER EQUIVALENT -->
    <script>
        /* =========================================
           1. DATA ASSETS (E-Commerce & Blog)
           ========================================= */
        const eCommerceAssets = [
            { id: 1, title: "Executive Gold Timepiece", price: "$4,999", img: "⌚", desc: "Crafted with 18k gold and precision engineering." },
            { id: 2, title: "Premium Leather Portfolio", price: "$450", img: "💼", desc: "Hand-stitched Italian leather for the modern professional." },
            { id: 3, title: "Success Mindset Audio Course", price: "$199", img: "🎧", desc: "Exclusive affiliate strategies and wealth mindsets." },
            { id: 4, title: "Gold Pouch Cufflinks", price: "$299", img: "👔", desc: "Signature brand cufflinks to complete your executive look." },
            { id: 5, title: "Elite Network Access pass", price: "$999", img: "🎟️", desc: "Yearly access to our private mastermind group." }
        ];

        const blogAssets = [
            { id: 1, title: "Maximizing High-Ticket Affiliate ROI", date: "Oct 15, 2026", img: "📈", excerpt: "Learn the secrets to closing premium affiliate deals with consistency." },
            { id: 2, title: "The Psychology of Premium Branding", date: "Oct 10, 2026", img: "🧠", excerpt: "Why aesthetics like gold and white convert higher-tier clients." },
            { id: 3, title: "Structuring Your Sales Funnel", date: "Oct 05, 2026", img: "🌪️", excerpt: "A step-by-step guide to building a funnel that sells for you 24/7." },
            { id: 4, title: "Email Marketing for Luxury Niches", date: "Sep 28, 2026", img: "✉️", excerpt: "Crafting copy that appeals to high-net-worth individuals." },
            { id: 5, title: "Passive Income Myths Debunked", date: "Sep 20, 2026", img: "💡", excerpt: "The reality of building true wealth through digital assets." }
        ];

        /* =========================================
           2. RENDER FUNCTIONS (Populating UI)
           ========================================= */
        function createCard(item, type) {
            // Decoupled clean card HTML component
            const isProduct = type === 'product';
            return `
                <div class="premium-card flex flex-col p-6 h-full" onclick="openDetails('${type}', ${item.id})">
                    <div class="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-6xl mb-4 border border-gray-100 flex-shrink-0">
                        ${item.img}
                    </div>
                    <h3 class="font-bold text-lg mb-2 text-gray-900">${item.title}</h3>
                    ${isProduct 
                        ? `<p class="text-gold-500 font-semibold text-xl mt-auto">${item.price}</p>` 
                        : `<p class="text-sm text-gray-400 mb-2">${item.date}</p><p class="text-gray-600 text-sm mt-auto">${item.excerpt}</p>`}
                </div>
            `;
        }

        function populateMarquee(containerId, data, type) {
            const container = document.getElementById(containerId);
            if(!container) return;
            
            // Map over items, specifically wrapping them in the scrolling track element class '.collage-item'
            const itemsHTML = data.slice(0, 3).map(item => `
                <div class="collage-item">
                    ${createCard(item, type)}
                </div>
            `).join('');
            
            // Duplicate to create infinite loop marquee effect
            container.innerHTML = itemsHTML + itemsHTML;
        }

        /* =========================================
           3. MODAL LOGIC (Overlay with Scrolling)
           ========================================= */
        const modal = document.getElementById('main-modal');
        const modalBody = document.getElementById('modal-body');

        function openModal(type) {
            let html = '';
            let data = type === 'products' ? eCommerceAssets : blogAssets;
            let title = type === 'products' ? 'Premium Products Catalog' : 'Wealth Insights Archive';
            let itemType = type === 'products' ? 'product' : 'blog';

            html += `<h2 class="text-3xl font-serif font-bold text-gray-900 mb-6 border-b border-gold-500/20 pb-4">${title}</h2>`;
            
            // Clean CSS Grid layout with NO animation/carousel overrides squishing the cards
            html += `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">`;
            
            data.forEach(item => {
                html += `
                    <div class="w-full">
                        ${createCard(item, itemType)}
                    </div>
                `;
            });
            
            html += `</div>`;
            
            modalBody.innerHTML = html;
            modal.classList.add('active');
        }

        function openDetails(type, id) {
            const dataSet = type === 'product' ? eCommerceAssets : blogAssets;
            const item = dataSet.find(i => i.id === id);
            
            if(!item) return;

            modalBody.innerHTML = `
                <div class="text-center pt-4">
                    <div class="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-7xl mb-6 shadow-inner border border-gold-500/30">
                        ${item.img}
                    </div>
                    <h2 class="text-3xl font-serif font-bold text-gray-900 mb-2">${item.title}</h2>
                    ${type === 'product' 
                        ? `<p class="text-2xl text-gold-500 font-bold mb-6">${item.price}</p>`
                        : `<p class="text-md text-gray-500 mb-6">${item.date}</p>`
                    }
                    <p class="text-gray-600 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                        ${item.desc || item.excerpt} 
                        This is premium placeholder content demonstrating the deep dive view for the Gold Pouch platform.
                    </p>
                    <button class="btn-gold px-8 py-3" onclick="openModal('${type === 'product' ? 'products' : 'blogs'}')">
                        Back to List
                    </button>
                </div>
            `;
            modal.classList.add('active');
        }

        function closeModal(e, force = false) {
            if (force || e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => { modalBody.innerHTML = ''; }, 300);
            }
        }

        /* =========================================
           4. ROUTING LOGIC (404 Page Handle)
           ========================================= */
        function handleRouting() {
            const hash = window.location.hash;
            const appView = document.getElementById('app-view');
            const notFoundView = document.getElementById('404-view');

            if (hash && hash !== '#' && hash !== '#ecommerce' && hash !== '#blog') {
                appView.classList.add('hidden');
                notFoundView.classList.remove('hidden');
                closeModal(null, true);
            } else {
                appView.classList.remove('hidden');
                notFoundView.classList.add('hidden');
            }
        }

        window.addEventListener('hashchange', handleRouting);

        /* =========================================
           5. CANVAS ANIMATION (Neon Gold Heart Rate)
           ========================================= */
        function initCanvasAnimation() {
            const canvas = document.getElementById('neon-background');
            const ctx = canvas.getContext('2d');
            let w, h;
            
            function resize() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            let time = 0;

            function drawHeartRate() {
                ctx.clearRect(0, 0, w, h);
                
                const centerY = h / 2;
                const pathWidth = Math.min(w * 0.8, 800);
                const startX = (w - pathWidth) / 2;
                
                const points = [
                    {x: 0, y: 0},
                    {x: pathWidth * 0.2, y: 0},
                    {x: pathWidth * 0.25, y: -40},
                    {x: pathWidth * 0.3, y: 50},
                    {x: pathWidth * 0.35, y: -80},
                    {x: pathWidth * 0.4, y: 0},
                    
                    {x: pathWidth * 0.45, y: -60},
                    {x: pathWidth * 0.5, y: 20},
                    {x: pathWidth * 0.55, y: -60},
                    
                    {x: pathWidth * 0.6, y: 0},
                    {x: pathWidth * 0.65, y: -50},
                    {x: pathWidth * 0.7, y: 40},
                    {x: pathWidth * 0.75, y: -20},
                    {x: pathWidth * 0.8, y: 0},
                    {x: pathWidth, y: 0}
                ];

                ctx.strokeStyle = '#D4AF37';
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                
                const pulse = Math.sin(time) * 0.5 + 0.5;
                ctx.shadowBlur = 10 + (15 * pulse);
                ctx.shadowColor = '#D4AF37';
                ctx.globalAlpha = 0.4 + (0.3 * pulse);

                ctx.beginPath();
                ctx.moveTo(startX + points[0].x, centerY + points[0].y);
                for(let i = 1; i < points.length; i++) {
                    ctx.lineTo(startX + points[i].x, centerY + points[i].y);
                }
                ctx.stroke();

                const totalPoints = points.length;
                const blipProgress = (time * 2) % (totalPoints - 1);
                const startIndex = Math.floor(blipProgress);
                const endIndex = startIndex + 1;
                
                if (endIndex < totalPoints) {
                    const t = blipProgress - startIndex;
                    const p1 = points[startIndex];
                    const p2 = points[endIndex];
                    
                    const blipX = startX + p1.x + (p2.x - p1.x) * t;
                    const blipY = centerY + p1.y + (p2.y - p1.y) * t;
                    
                    ctx.beginPath();
                    ctx.arc(blipX, blipY, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFF';
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#F1D570';
                    ctx.fill();
                }

                time += 0.05;
                requestAnimationFrame(drawHeartRate);
            }

            drawHeartRate();
        }

        /* =========================================
           6. INITIALIZATION
           ========================================= */
        window.onload = () => {
            populateMarquee('ecommerce-track', eCommerceAssets, 'product');
            populateMarquee('blog-track', blogAssets, 'blog');
            initCanvasAnimation();
            handleRouting();
        };

    </script>
