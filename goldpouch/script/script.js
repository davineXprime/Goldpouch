const productsData = [
    {
        id: "p1",
        niche: "tech",
        type: "physical",
        title: "AuraFit Smart Tracker Ring",
        desc: "Comfortable, sleek smart ring tracking deep biometric data, REM stages, heart rate variability, and active metabolic outputs.",
        price: "$299.00",
        rating: 4.9,
        badge: "Top Seller",
        affiliateLink: "https://amazon.com",
        linkText: "Buy on Amazon",
        icon: "activity",
        iconColor: "text-amber-400 bg-amber-500/10"
    },
    {
        id: "p2",
        niche: "healthcare",
        type: "physical",
        title: "Ergonomic Lumbar Support Cushion",
        desc: "Orthopedic high-grade memory foam specifically designed to alleviate physical pressure during prolonged work sessions.",
        price: "$45.99",
        rating: 4.7,
        badge: "Health Essential",
        affiliateLink: "https://amazon.com",
        linkText: "Get on Amazon",
        icon: "shield",
        iconColor: "text-amber-400 bg-amber-500/10"
    },
    {
        id: "p3",
        niche: "diet",
        type: "digital",
        title: "12-Week Personal Meal Planner",
        desc: "Digital PDF toolkit featuring macro calculators, automated shopping lists, and specific meal adjustments to jumpstart metabolic efficiency.",
        price: "$29.00",
        rating: 4.8,
        badge: "Digital Blueprint",
        affiliateLink: "https://clickbank.com",
        linkText: "Instant Download",
        icon: "chef-hat",
        iconColor: "text-amber-400 bg-amber-500/10"
    }
];

const blogData = [
    {
        id: "b1",
        niche: "tech",
        category: "Technology / Biohacking",
        title: "5 Smart Gadgets Revolutionizing Wellness & Brain Performance",
        excerpt: "Explore how current physical smart rings and cognitive tracking tools are changing deep biofeedback routines in 2026...",
        date: "May 18, 2026",
        author: "Dr. Ethan Brooks",
        content: [
            "Optimal productivity and recovery are no longer a matter of guessing. wearable biofeedback loops allow high performers to actively map out circadian rhythms, metabolic readiness, and cognitive stress.",
            "The primary breakthrough lies in multi-spectral PPG sensors. Devices like the AuraFit Smart Ring are capable of delivering evaluations of HRV, blood oxygen, and sleep stage trends. This signals exactly when to focus on deep tasks or step back for active recovery."
        ],
        relatedProduct: "AuraFit Smart Tracker Ring"
    }
];

let selectedNiche = "all";
let blogFilter = "all";
let searchQuery = "";

window.onload = function() {
    lucide.createIcons();
    renderProducts();
    renderBlog();
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
};

function scrollCollage(trackId, direction) {
    const track = document.getElementById(trackId);
    const scrollAmount = 350;
    if (direction === 'left') {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function renderProducts() {
    const container = document.getElementById('product-collage-track');
    const emptyMsg = document.getElementById('no-products-msg');
    container.innerHTML = "";

    const filtered = productsData.filter(p => {
        const matchesNiche = (selectedNiche === 'all' || p.niche === selectedNiche);
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesNiche && matchesSearch;
    });

    if (filtered.length === 0) {
        emptyMsg.classList.remove('hidden');
        container.classList.add('hidden');
    } else {
        emptyMsg.classList.add('hidden');
        container.classList.remove('hidden');
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = "min-w-[320px] max-w-[320px] bg-slate-900 rounded-2xl p-5 gold-block-outline gold-block-outline-hover flex flex-col justify-between snap-start flex-shrink-0 whitespace-normal";
            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded bg-slate-950 text-amber-400 border border-amber-500/30">${p.badge}</span>
                        <div class="flex items-center text-amber-400 font-bold text-xs">
                            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1"></i> ${p.rating}
                        </div>
                    </div>
                    <div class="w-full h-40 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 flex items-center justify-center relative">
                        <div class="w-14 h-14 rounded-2xl ${p.iconColor} flex items-center justify-center border border-amber-500/20">
                            <i data-lucide="${p.icon}" class="w-7 h-7"></i>
                        </div>
                    </div>
                    <h3 class="font-bold text-white text-base mb-1.5">${p.title}</h3>
                    <p class="text-slate-400 text-xs leading-relaxed mb-4">${p.desc}</p>
                </div>
                <div class="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold text-white gold-chrome-text">${p.price}</span>
                    <a href="${p.affiliateLink}" target="_blank" class="inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-4 py-2.5 rounded-lg gold-chrome-btn">
                        ${p.linkText} <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
    }
    lucide.createIcons();
}

function renderBlog() {
    const container = document.getElementById('blog-collage-track');
    container.innerHTML = "";
    const filtered = blogData.filter(b => blogFilter === 'all' || b.niche === blogFilter);

    filtered.forEach(b => {
        const article = document.createElement('article');
        article.className = "min-w-[320px] max-w-[340px] bg-slate-900 rounded-2xl p-6 gold-block-outline gold-block-outline-hover flex flex-col justify-between cursor-pointer snap-start flex-shrink-0 whitespace-normal";
        article.setAttribute('onclick', `openArticleModal('${b.id}')`);
        article.innerHTML = `
            <div>
                <span class="text-[10px] font-bold text-amber-400 uppercase tracking-widest">${b.category}</span>
                <h3 class="font-extrabold text-white text-lg sm:text-xl mt-2 mb-2 hover:gold-chrome-text line-clamp-2">${b.title}</h3>
                <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">${b.excerpt}</p>
            </div>
            <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs uppercase">
                        ${b.author.charAt(4)}
                    </div>
                    <div class="text-left">
                        <p class="text-xs font-bold text-slate-200 leading-none">${b.author}</p>
                    </div>
                </div>
                <span class="inline-flex items-center gap-1 text-xs font-bold gold-chrome-text">
                    Read Article <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </span>
            </div>
        `;
        container.appendChild(article);
    });
    lucide.createIcons();
}

function searchProducts() {
    searchQuery = document.getElementById('product-search').value;
    renderProducts();
}

function filterNiche(niche) {
    selectedNiche = niche;
    const buttons = document.querySelectorAll('.filter-tab-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === niche) {
            btn.className = "filter-tab-btn px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg gold-chrome-btn transition-all";
        } else {
            btn.className = "filter-tab-btn px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all";
        }
    });
    renderProducts();
}

function filterBlog(niche) {
    blogFilter = niche;
    const buttons = document.querySelectorAll('.blog-tab-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-blog-filter') === niche) {
            btn.className = "blog-tab-btn px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg gold-chrome-btn transition-all";
        } else {
            btn.className = "blog-tab-btn px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-900 text-slate-400 border border-slate-800 transition-all";
        }
    });
    renderBlog();
}

function openArticleModal(id) {
    const post = blogData.find(b => b.id === id);
    if (!post) return;

    const related = productsData.find(p => p.title === post.relatedProduct) || productsData[0];
    document.getElementById('modal-category').innerText = post.category;
    document.getElementById('modal-title').innerText = post.title;
    document.getElementById('modal-author').innerText = post.author;
    document.getElementById('modal-date').innerText = post.date;

    const banner = document.getElementById('modal-banner-graphic');
    let visualIcon = post.niche === 'tech' ? 'cpu' : (post.niche === 'diet' ? 'chef-hat' : 'shield-alert');
    banner.innerHTML = `<div class="p-6 bg-slate-900 rounded-2xl border border-amber-500/20 flex flex-col items-center"><i data-lucide="${visualIcon}" class="w-12 h-12 text-amber-400 mb-2"></i></div>`;

    const contentContainer = document.getElementById('modal-content');
    contentContainer.innerHTML = "";
    post.content.forEach(pText => {
        const p = document.createElement('p');
        p.className = "text-slate-300 mb-4 text-sm leading-relaxed";
        p.innerText = pText;
        contentContainer.appendChild(p);
    });

    document.getElementById('modal-promo-title').innerText = related.title;
    document.getElementById('modal-promo-link').href = related.affiliateLink;

    document.getElementById('article-modal').classList.remove('hidden');
    document.body.style.overflow = "hidden";
    lucide.createIcons();
}

function closeArticleModal() {
    document.getElementById('article-modal').classList.add('hidden');
    document.body.style.overflow = "auto";
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function showToast(title, desc) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    toast.classList.remove('opacity-0', 'translate-y-24');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(hideToast, 4000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-24');
}

function handleSubscribe(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    showToast("Subscribed!", `Address registered: ${email}`);
    document.getElementById('email').value = "";
}