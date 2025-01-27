// Objeto com as traduções para cada idioma
const translations = {
    pt: {
        restaurantTitle: "Restaurante",
        languageButton: "English",
        main1: "Peixe Grelhado",
        main1Price: "€ 25,00",
        main1Description: "Peixe grelhado com ervas finas e acompanhamentos.",
        main2: "Polvo Grelhado",
        main2Price: "€ 35,00",
        main2Description: "Polvo grelhado com polenta e batatas.",
        main3: "Bife à Parmegiana",
        main3Price: "€ 40,00",
        main3Description: "Bife à parmegiana com molho de tomate e queijo derretido.",
        main4: "Lasanha",
        main4Price: "€ 38,00",
        main4Description: "Lasanha à bolonhesa com queijo gratinado.",
        main5: "Risoto de Cogumelos",
        main5Price: "€ 42,00",
        main5Description: "Risoto cremoso com cogumelos frescos.",
        drink1: "Suco Natural",
        drink1Price: "€ 10,00",
        drink1Description: "Suco natural feito na hora.",
        drink2: "Refrigerante",
        drink2Price: "€ 8,00",
        drink2Description: "Refrigerante gelado de diversos sabores.",
        drink3: "Cerveja Artesanal",
        drink3Price: "€ 15,00",
        drink3Description: "Cerveja artesanal de alta qualidade.",
        dessert1: "Pudim de Leite",
        dessert1Price: "€ 12,00",
        dessert1Description: "Pudim de leite condensado com calda de caramelo.",
        dessert2: "Mousse de Chocolate",
        dessert2Price: "€ 14,00",
        dessert2Description: "Mousse de chocolate cremoso e leve.",
        dessert3: "Cheesecake",
        dessert3Price: "€ 16,00",
        dessert3Description: "Cheesecake com base de biscoito e frutas vermelhas.",
        // Adicione as traduções para os botões do menu
        menuMain: "Pratos Principais",
        menuDrinks: "Bebidas",
        menuDesserts: "Sobremesas"
    },
    en: {
        restaurantTitle: "Restaurant",
        languageButton: "Português",
        main1: "Grilled Fish",
        main1Price: "€ 25.00",
        main1Description: "Grilled fish with fine herbs and sides.",
        main2: "Grilled Octopus",
        main2Price: "€ 35.00",
        main2Description: "Grilled octopus with polenta and potatoes.",
        main3: "Chicken Parmesan",
        main3Price: "€ 40.00",
        main3Description: "Chicken parmesan with tomato sauce and melted cheese.",
        main4: "Lasagna",
        main4Price: "€ 38.00",
        main4Description: "Lasagna bolognese with gratin cheese.",
        main5: "Mushroom Risotto",
        main5Price: "€ 42.00",
        main5Description: "Creamy risotto with fresh mushrooms.",
        drink1: "Natural Juice",
        drink1Price: "€ 10.00",
        drink1Description: "Freshly made natural juice.",
        drink2: "Soda",
        drink2Price: "€ 8.00",
        drink2Description: "Iced soda in various flavors.",
        drink3: "Craft Beer",
        drink3Price: "€ 15.00",
        drink3Description: "High-quality craft beer.",
        dessert1: "Milk Pudding",
        dessert1Price: "€ 12.00",
        dessert1Description: "Condensed milk pudding with caramel sauce.",
        dessert2: "Chocolate Mousse",
        dessert2Price: "€ 14.00",
        dessert2Description: "Creamy and light chocolate mousse.",
        dessert3: "Cheesecake",
        dessert3Price: "€ 16.00",
        dessert3Description: "Cheesecake with a biscuit base and red berries.",
        // Adicione as traduções para os botões do menu
        menuMain: "Main Dishes",
        menuDrinks: "Drinks",
        menuDesserts: "Desserts"
    }
};

// Função para atualizar os textos na página
function updateLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Função para atualizar a imagem e a descrição com base no item clicado
function updateImageAndDescription(item) {
    const imageSrc = item.getAttribute("data-image");
    const descriptionKey = item.getAttribute("data-description");
    document.getElementById("displayed-image").src = imageSrc;
    document.getElementById("item-description").setAttribute("data-i18n", descriptionKey);
}

// Função para atualizar a imagem e a descrição com base no primeiro item do menu ativo
function updateImageForActiveMenu() {
    const activeMenu = document.querySelector(".menu-category[style='display: flex;']") || document.querySelector(".menu-category:not([style])");
    if (activeMenu) {
        const firstItem = activeMenu.querySelector(".menu-item");
        if (firstItem) {
            updateImageAndDescription(firstItem);
        }
    }
}

// Evento para mudar o idioma ao clicar no botão
let currentLang = "pt"; // Idioma inicial
document.getElementById("language-toggle").addEventListener("click", function() {
    currentLang = currentLang === "pt" ? "en" : "pt";
    updateLanguage(currentLang);
    this.textContent = currentLang === "en" ? "Português" : "English";
});

// Definir o idioma inicial
updateLanguage(currentLang);

// Lógica para alternar entre os menus
document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".menu-button").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const category = this.getAttribute("data-category");
        document.querySelectorAll(".menu-category").forEach(cat => {
            cat.style.display = cat.id === category ? "flex" : "none";
        });

        // Atualiza a imagem e a descrição para o primeiro item do menu selecionado
        updateImageForActiveMenu();
    });
});

// Lógica para exibir a imagem e a descrição ao clicar em um item do menu
document.querySelectorAll(".item-button").forEach(button => {
    button.addEventListener("click", function() {
        const item = this.parentElement;
        updateImageAndDescription(item);
    });
});

// Função para verificar a orientação do dispositivo
const orientationMessages = {
    pt: "Por favor, gire seu dispositivo para o modo paisagem.",
    en: "Please rotate your device to landscape mode."
};

function updateOrientationMessage() {
    const orientationMessage = document.querySelector('.orientation-message p');
    currentLang = currentLang === "pt" ? "en" : "pt";
    orientationMessage.textContent = orientationMessages[currentLang];
}

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const orientationMessage = document.querySelector('.orientation-message');
    
    if (!isLandscape) {
        orientationMessage.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Start alternating messages
        updateOrientationMessage();
        this.orientationMessageInterval = setInterval(updateOrientationMessage, 3000);
    } else {
        orientationMessage.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop alternating messages
        clearInterval(this.orientationMessageInterval);
    }
}

// Check orientation on load and resize
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);