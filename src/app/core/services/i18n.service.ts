import { Injectable, signal, computed } from '@angular/core';
import { Language } from '../models';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.explore': 'Explorar',
    'nav.clubs': 'Clubs',
    'nav.myLibrary': 'Mi Biblioteca',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.profile': 'Perfil',
    'nav.settings': 'Ajustes',
    'nav.logout': 'Cerrar Sesión',

    // Home
    'home.hero.title': 'Descubre tu próxima gran historia',
    'home.hero.subtitle': 'Únete a la comunidad de lectores más apasionada. Explora libros, únete a clubs de lectura y comparte tu pasión por la literatura.',
    'home.hero.cta': 'Explorar Libros',
    'home.hero.secondary': 'Ver Clubs',
    'home.featured': 'Libros Destacados',
    'home.featuredSub': 'Seleccionados por nuestra comunidad de lectores',
    'home.popular': 'Clubs Populares',
    'home.popularSub': 'Únete a la conversación',
    'home.categories': 'Explora por Categoría',
    'home.categoriesSub': 'Encuentra tu próxima aventura literaria',
    'home.stats.books': 'Libros',
    'home.stats.members': 'Miembros',
    'home.stats.clubs': 'Clubs',
    'home.stats.reviews': 'Reseñas',
    'home.cta.title': '¿Listo para tu próxima aventura?',
    'home.cta.subtitle': 'Únete a Reading Club y descubre un mundo de historias esperándote.',
    'home.cta.button': 'Comenzar Gratis',

    // Explore
    'explore.title': 'Explorar Libros',
    'explore.subtitle': 'Descubre tu próxima lectura favorita',
    'explore.search': 'Buscar por título, autor o género...',
    'explore.filter.all': 'Todos',
    'explore.noResults': 'No se encontraron libros',

    // Book detail
    'book.by': 'por',
    'book.pages': 'páginas',
    'book.year': 'Año',
    'book.genre': 'Género',
    'book.language': 'Idioma',
    'book.rating': 'Calificación',
    'book.progress': 'Progreso de lectura',
    'book.addToLibrary': 'Agregar a Mi Biblioteca',
    'book.removeFromLibrary': 'Quitar de Mi Biblioteca',
    'book.startReading': 'Comenzar a Leer',
    'book.description': 'Sinopsis',
    'book.relatedClubs': 'Clubs que discuten este libro',
    'book.reviews': 'Reseñas',

    // Clubs
    'clubs.title': 'Clubs de Lectura',
    'clubs.subtitle': 'Encuentra tu comunidad perfecta',
    'clubs.search': 'Buscar clubs...',
    'clubs.members': 'miembros',
    'clubs.join': 'Unirse',
    'clubs.joined': 'Miembro',
    'clubs.create': 'Crear Club',
    'clubs.nextSession': 'Próxima sesión',
    'clubs.discussion': 'Discusión',
    'clubs.addComment': 'Escribe un comentario...',
    'clubs.send': 'Enviar',
    'clubs.membersList': 'Miembros del Club',

    // My Library
    'library.title': 'Mi Biblioteca',
    'library.subtitle': 'Tu colección personal de lectura',
    'library.reading': 'Leyendo',
    'library.completed': 'Completados',
    'library.wantToRead': 'Quiero Leer',
    'library.all': 'Todos',
    'library.empty': 'Tu biblioteca está vacía',
    'library.emptyDesc': 'Explora nuestro catálogo y agrega libros a tu biblioteca',
    'library.stats': 'Mis Estadísticas',
    'library.booksRead': 'Libros leídos',
    'library.pagesRead': 'Páginas leídas',
    'library.avgRating': 'Calificación promedio',

    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.loginSubtitle': 'Bienvenido de vuelta a Reading Club',
    'auth.register': 'Crear Cuenta',
    'auth.registerSubtitle': 'Únete a la comunidad de lectores',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre completo',
    'auth.confirmPassword': 'Confirmar contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    'auth.loginBtn': 'Entrar',
    'auth.registerBtn': 'Registrarse',

    // Settings
    'settings.title': 'Ajustes',
    'settings.language': 'Idioma',
    'settings.spanish': 'Español',
    'settings.english': 'English',
    'settings.theme': 'Tema',
    'settings.light': 'Claro',
    'settings.dark': 'Oscuro',
    'settings.profile': 'Perfil',
    'settings.save': 'Guardar cambios',

    // Footer
    'footer.tagline': 'Tu club de lectura digital. Descubre, lee y comparte.',
    'footer.explore': 'Explorar',
    'footer.community': 'Comunidad',
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.rights': 'Todos los derechos reservados.',

    // General
    'general.seeMore': 'Ver más',
    'general.seeAll': 'Ver todos',
    'general.back': 'Volver',
    'general.save': 'Guardar',
    'general.cancel': 'Cancelar',
    'general.delete': 'Eliminar',
    'general.edit': 'Editar',
    'general.loading': 'Cargando...',
    'general.confirm': 'Confirmar',
    'general.yes': 'Sí',
    'general.no': 'No',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.clubs': 'Clubs',
    'nav.myLibrary': 'My Library',
    'nav.login': 'Sign In',
    'nav.register': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Sign Out',

    // Home
    'home.hero.title': 'Discover your next great story',
    'home.hero.subtitle': 'Join the most passionate community of readers. Explore books, join reading clubs and share your passion for literature.',
    'home.hero.cta': 'Explore Books',
    'home.hero.secondary': 'View Clubs',
    'home.featured': 'Featured Books',
    'home.featuredSub': 'Curated by our community of readers',
    'home.popular': 'Popular Clubs',
    'home.popularSub': 'Join the conversation',
    'home.categories': 'Explore by Category',
    'home.categoriesSub': 'Find your next literary adventure',
    'home.stats.books': 'Books',
    'home.stats.members': 'Members',
    'home.stats.clubs': 'Clubs',
    'home.stats.reviews': 'Reviews',
    'home.cta.title': 'Ready for your next adventure?',
    'home.cta.subtitle': 'Join Reading Club and discover a world of stories waiting for you.',
    'home.cta.button': 'Start Free',

    // Explore
    'explore.title': 'Explore Books',
    'explore.subtitle': 'Discover your next favorite read',
    'explore.search': 'Search by title, author or genre...',
    'explore.filter.all': 'All',
    'explore.noResults': 'No books found',

    // Book detail
    'book.by': 'by',
    'book.pages': 'pages',
    'book.year': 'Year',
    'book.genre': 'Genre',
    'book.language': 'Language',
    'book.rating': 'Rating',
    'book.progress': 'Reading progress',
    'book.addToLibrary': 'Add to My Library',
    'book.removeFromLibrary': 'Remove from Library',
    'book.startReading': 'Start Reading',
    'book.description': 'Synopsis',
    'book.relatedClubs': 'Clubs discussing this book',
    'book.reviews': 'Reviews',

    // Clubs
    'clubs.title': 'Reading Clubs',
    'clubs.subtitle': 'Find your perfect community',
    'clubs.search': 'Search clubs...',
    'clubs.members': 'members',
    'clubs.join': 'Join',
    'clubs.joined': 'Member',
    'clubs.create': 'Create Club',
    'clubs.nextSession': 'Next session',
    'clubs.discussion': 'Discussion',
    'clubs.addComment': 'Write a comment...',
    'clubs.send': 'Send',
    'clubs.membersList': 'Club Members',

    // My Library
    'library.title': 'My Library',
    'library.subtitle': 'Your personal reading collection',
    'library.reading': 'Reading',
    'library.completed': 'Completed',
    'library.wantToRead': 'Want to Read',
    'library.all': 'All',
    'library.empty': 'Your library is empty',
    'library.emptyDesc': 'Explore our catalog and add books to your library',
    'library.stats': 'My Stats',
    'library.booksRead': 'Books read',
    'library.pagesRead': 'Pages read',
    'library.avgRating': 'Average rating',

    // Auth
    'auth.login': 'Sign In',
    'auth.loginSubtitle': 'Welcome back to Reading Club',
    'auth.register': 'Create Account',
    'auth.registerSubtitle': 'Join the community of readers',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.name': 'Full name',
    'auth.confirmPassword': 'Confirm password',
    'auth.forgotPassword': 'Forgot your password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.loginBtn': 'Sign In',
    'auth.registerBtn': 'Sign Up',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.spanish': 'Español',
    'settings.english': 'English',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.profile': 'Profile',
    'settings.save': 'Save changes',

    // Footer
    'footer.tagline': 'Your digital reading club. Discover, read and share.',
    'footer.explore': 'Explore',
    'footer.community': 'Community',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.rights': 'All rights reserved.',

    // Categories
    'Realismo Mágico': 'Magical Realism',
    'Clásico': 'Classic',
    'Distopía': 'Dystopia',
    'Fábula': 'Fable',
    'Experimental': 'Experimental',
    'Misterio': 'Mystery',
    'Ciencia Ficción': 'Science Fiction',
    'Romance': 'Romance',
    'Cuentos': 'Short Stories',
    'Fantasía': 'Fantasy',
    'Ficción': 'Fiction',
    'Novela Corta': 'Novella',
    'Aventura': 'Adventure',

    // Mock Data Books
    'Cien Años de Soledad': 'One Hundred Years of Solitude',
    'La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que explora temas de soledad, amor y destino.': 'The story of the Buendía family over seven generations in the fictional town of Macondo. A masterpiece of magical realism that explores themes of solitude, love, and destiny.',
    'Don Quijote de la Mancha': 'Don Quixote',
    'Las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza. La primera novela moderna y una de las obras más influyentes de la literatura universal.': 'The adventures of the ingenious nobleman Don Quixote and his faithful squire Sancho Panza. The first modern novel and one of the most influential works of universal literature.',
    '1984': '1984',
    'En un mundo totalitario donde el Gran Hermano todo lo ve, Winston Smith lucha por mantener su humanidad. Una profecía escalofriante sobre el poder y la vigilancia.': 'In a totalitarian world where Big Brother sees everything, Winston Smith struggles to maintain his humanity. A chilling prophecy about power and surveillance.',
    'El Principito': 'The Little Prince',
    'Un piloto perdido en el desierto del Sahara encuentra a un pequeño príncipe de otro planeta. Una historia sobre la amistad, el amor y lo esencial invisible a los ojos.': 'A pilot lost in the Sahara Desert meets a young prince from another planet. A story about friendship, love, and what is essential is invisible to the eye.',
    'Rayuela': 'Hopscotch',
    'Horacio Oliveira busca el sentido de la vida entre París y Buenos Aires. Una novela que se puede leer de múltiples formas, revolucionando la narrativa.': 'Horacio Oliveira searches for the meaning of life between Paris and Buenos Aires. A novel that can be read in multiple ways, revolutionizing the narrative.',
    'La Sombra del Viento': 'The Shadow of the Wind',
    'Daniel Sempere descubre un libro maldito en el Cementerio de los Libros Olvidados. Un misterio que se desarrolla en la Barcelona de posguerra.': 'Daniel Sempere discovers a cursed book in the Cemetery of Forgotten Books. A mystery that unfolds in post-war Barcelona.',
    'Pedro Páramo': 'Pedro Páramo',
    'Juan Preciado viaja a Comala en busca de su padre Pedro Páramo, solo para encontrar un pueblo fantasma. Obra fundamental del realismo mágico mexicano.': 'Juan Preciado travels to Comala in search of his father Pedro Páramo, only to find a ghost town. A fundamental work of Mexican magical realism.',
    'Fahrenheit 451': 'Fahrenheit 451',
    'En un futuro donde los libros están prohibidos y los bomberos los queman, Guy Montag comienza a cuestionar todo. Una defensa apasionada de la literatura.': 'In a future where books are banned and firemen burn them, Guy Montag begins to question everything. A passionate defense of literature.',
    'La Casa de los Espíritus': 'The House of the Spirits',
    'La saga de la familia Trueba-Del Valle a través de cuatro generaciones en Chile. Amor, política y lo sobrenatural se entrelazan en esta épica.': 'The saga of the Trueba-Del Valle family over four generations in Chile. Love, politics, and the supernatural intertwine in this epic.',
    'El Alquimista': 'The Alchemist',
    'Santiago, un joven pastor andaluz, emprende un viaje en busca de un tesoro en las pirámides de Egipto. Una parábola sobre seguir tus sueños.': 'Santiago, a young Andalusian shepherd, embarks on a journey in search of a treasure in the Egyptian pyramids. A parable about following your dreams.',
    'Crimen y Castigo': 'Crime and Punishment',
    'Raskólnikov comete un asesinato y debe enfrentar las consecuencias morales y psicológicas de su acto. Una exploración profunda de la culpa y la redención.': 'Raskolnikov commits a murder and must face the moral and psychological consequences of his act. A profound exploration of guilt and redemption.',
    'Crónica de una Muerte Anunciada': 'Chronicle of a Death Foretold',
    'Todo el pueblo sabía que Santiago Nasar iba a morir, pero nadie hizo nada para impedirlo. Un relato magistral sobre el honor y la fatalidad.': 'The whole town knew that Santiago Nasar was going to die, but no one did anything to stop it. A masterful tale about honor and fatality.',
    'El Nombre de la Rosa': 'The Name of the Rose',
    'Fray Guillermo de Baskerville investiga muertes misteriosas en una abadía medieval. Un thriller intelectual que mezcla teología, filosofía y detective noir.': 'Friar William of Baskerville investigates mysterious deaths in a medieval abbey. An intellectual thriller that mixes theology, philosophy, and noir detective.',
    'Tokio Blues': 'Norwegian Wood',
    'Toru Watanabe recuerda sus días universitarios en Tokio, atrapado entre dos mujeres y marcado por la pérdida. Una historia de amor y melancolía.': 'Toru Watanabe remembers his university days in Tokyo, caught between two women and marked by loss. A story of love and melancholy.',
    'Ficciones': 'Fictions',
    'Una colección de cuentos que exploran laberintos, bibliotecas infinitas y mundos paralelos. Borges crea universos enteros en pocas páginas.': 'A collection of short stories that explore labyrinths, infinite libraries, and parallel worlds. Borges creates entire universes in a few pages.',
    'Dune': 'Dune',
    'Paul Atreides debe sobrevivir en Arrakis, fuente de la sustancia más valiosa del universo. Política, religión y ecología en una épica sci-fi inigualable.': 'Paul Atreides must survive on Arrakis, source of the most valuable substance in the universe. Politics, religion, and ecology in an unmatched sci-fi epic.',
    'La Metamorfosis': 'The Metamorphosis',
    'Gregor Samsa despierta convertido en un insecto gigante. Una alegoría sobre la alienación, la familia y la condición humana.': 'Gregor Samsa wakes up transformed into a giant insect. An allegory about alienation, family, and the human condition.',
    'El Amor en los Tiempos del Cólera': 'Love in the Time of Cholera',
    'Florentino Ariza espera más de medio siglo para declarar su amor a Fermina Daza. Una historia épica de amor eterno en el Caribe colombiano.': 'Florentino Ariza waits more than half a century to declare his love to Fermina Daza. An epic story of eternal love in the Colombian Caribbean.',
    'El Hobbit': 'The Hobbit',
    'Bilbo Bolsón es arrastrado a una aventura épica con enanos y un mago para recuperar un tesoro custodiado por un dragón. El inicio de la Tierra Media.': 'Bilbo Baggins is swept into an epic adventure with dwarves and a wizard to reclaim a treasure guarded by a dragon. The beginning of Middle-earth.',
    'Como Agua para Chocolate': 'Like Water for Chocolate',
    'Tita De la Garza canaliza sus emociones a través de la cocina. Una novela donde la gastronomía y la pasión se funden mágicamente.': 'Tita De la Garza channels her emotions through cooking. A novel where gastronomy and passion magically merge.',

    // Mock Data Clubs
    'Club García Márquez': 'García Márquez Club',
    'Exploramos la obra completa del Nobel colombiano. Desde Macondo hasta el Caribe, cada mes un libro diferente del maestro del realismo mágico.': 'We explore the complete works of the Colombian Nobel laureate. From Macondo to the Caribbean, every month a different book from the master of magical realism.',
    'Sci-Fi Explorers': 'Sci-Fi Explorers',
    'Para los que ven el futuro en cada página. Discutimos ciencia ficción clásica y contemporánea, desde Asimov hasta los más nuevos.': 'For those who see the future on every page. We discuss classic and contemporary science fiction, from Asimov to the newest authors.',
    'Clásicos Inmortales': 'Immortal Classics',
    'Los grandes de la literatura que trascienden el tiempo. De Cervantes a Dostoyevski, revisitamos las obras que definieron la cultura.': 'The literary greats that transcend time. From Cervantes to Dostoyevsky, we revisit the works that defined culture.',
    'Misterios & Thrillers': 'Mysteries & Thrillers',
    'Si te gustan los giros inesperados y las noches sin dormir por terminar un capítulo, este es tu club.': 'If you like unexpected twists and sleepless nights trying to finish a chapter, this is your club.',
    'Latinoamérica Lee': 'Latin America Reads',
    'Celebramos la riqueza literaria de América Latina. Boom, post-boom y las nuevas voces de nuestra narrativa continental.': 'We celebrate the literary wealth of Latin America. Boom, post-boom, and the new voices of our continental narrative.',
    'Mundos Fantásticos': 'Fantastic Worlds',
    'Elfos, dragones, magia y mundos imposibles. Desde Tolkien hasta Sanderson, exploramos la fantasía épica.': 'Elves, dragons, magic, and impossible worlds. From Tolkien to Sanderson, we explore epic fantasy.',
    'Café Literario Murakami': 'Murakami Literary Cafe',
    'Para los amantes de la prosa onírica de Murakami. Jazz, gatos y mundos paralelos.': 'For lovers of Murakami\'s dreamlike prose. Jazz, cats, and parallel worlds.',
    'Distopías del Mañana': 'Dystopias of Tomorrow',
    'Orwell, Huxley, Bradbury y más. Analizamos las visiones del futuro que nos advierten sobre el presente.': 'Orwell, Huxley, Bradbury, and more. We analyze the visions of the future that warn us about the present.',

    // General
    'general.seeMore': 'See more',
    'general.seeAll': 'See all',
    'general.back': 'Back',
    'general.save': 'Save',
    'general.cancel': 'Cancel',
    'general.delete': 'Delete',
    'general.edit': 'Edit',
    'general.loading': 'Loading...',
    'general.confirm': 'Confirm',
    'general.yes': 'Yes',
    'general.no': 'No',
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLang = signal<Language>(this.getSavedLanguage());

  lang = this.currentLang.asReadonly();

  t(key: string): string {
    return TRANSLATIONS[this.currentLang()][key] || key;
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('readingclub-lang', lang);
    }
    document.documentElement.lang = lang;
  }

  private getSavedLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('readingclub-lang');
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'es';
  }
}
