// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO MÓVEL =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu móvel
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animação do botão hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ===== NAVEGAÇÃO ATIVA =====
    // Atualizar link ativo baseado na secção visível
    const sections = document.querySelectorAll('.section, .hero');
    
    function setActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ===== HEADER AO SCROLL =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== ANIMAÇÃO DE CONTADORES =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const increment = target / 100;
                        let current = 0;

                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                stat.textContent = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                stat.textContent = target;
                            }
                        };

                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.sobre-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters();

    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== FORMULÁRIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obter valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;

        // Validação simples
        if (!nome || !email || !assunto || !mensagem) {
            showNotification('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }

        // Simular envio (aqui você integraria com backend)
        showNotification('Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
        
        // Limpar formulário
        contactForm.reset();
    });

    // ===== SISTEMA DE NOTIFICAÇÕES =====
    function showNotification(message, type = 'success') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Adicionar estilos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        // Adicionar ao body
        document.body.appendChild(notification);

        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ===== ANIMAÇÃO DE ELEMENTOS AO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.atividade-card, .noticia-card, .galeria-item, .stat-card'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMAÇÃO CSS ADICIONAL =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .notification {
            font-weight: 500;
            font-size: 0.95rem;
        }
    `;
    document.head.appendChild(style);

    // ===== EFEITO PARALLAX NO HERO =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });

    // ===== GALERIA MODAL (opcional) =====
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Visualizando: ${title}`, 'success');
            // Aqui você pode adicionar um modal de imagem em tela cheia
        });
    });

    // ===== LOADING INICIAL =====
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===== LOG DE INICIALIZAÇÃO =====
    console.log('🎓 Site da Associação Escolar - EPD inicializado com sucesso!');
    console.log('🎨 Design Preto e Branco aplicado');
    console.log('📱 Menu móvel configurado');
    console.log('🎯 Navegação ativa configurada');
    console.log('📊 Contadores animados prontos');
    console.log('📧 Formulário de contacto ativo');
    console.log('✨ Todas as animações carregadas');

    // ===== EASTER EGG =====
    let clickCount = 0;
    const logo = document.querySelector('.logo h1');
    
    logo.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 Parabéns! Descobriste o Easter Egg da EPD!', 'success');
            clickCount = 0;
            
            // Efeito especial
            document.body.style.animation = 'rainbow 2s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });

    // Animação rainbow para o easter egg
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
});

// ===== FUNÇÕES UTILITÁRIAS =====

// Debounce para otimização de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const efficientScroll = debounce(function() {
    // Funções de scroll otimizadas aqui
}, 10);

window.addEventListener('scroll', efficientScroll);

// ===== ACESSIBILIDADE =====
// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu móvel
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = document.getElementById('mobileToggle').querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ===== PROTEÇÃO CONTRA SPAM NO FORMULÁRIO =====
let lastSubmit = 0;
const SUBMIT_COOLDOWN = 5000; // 5 segundos

document.getElementById('contactForm').addEventListener('submit', function(e) {
    const now = Date.now();
    if (now - lastSubmit < SUBMIT_COOLDOWN) {
        e.preventDefault();
        const secondsLeft = Math.ceil((SUBMIT_COOLDOWN - (now - lastSubmit)) / 1000);
        showNotification(`Por favor aguarde ${secondsLeft} segundos antes de enviar outra mensagem.`, 'error');
        return false;
    }
    lastSubmit = now;
});
