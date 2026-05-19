import { Injectable } from '@angular/core';
import { Book, Club, Comment, User, ClubMember } from '../models';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  private cover(id: number): string {
    return `https://picsum.photos/seed/readingclub${id}/400/600`;
  }

  private readonly avatars = [
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=12',
    'https://i.pravatar.cc/150?img=13',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=15',
    'https://i.pravatar.cc/150?img=16',
    'https://i.pravatar.cc/150?img=17',
    'https://i.pravatar.cc/150?img=18',
  ];

  getBooks(): Book[] {
    return [
      { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', genre: 'Realismo Mágico', cover: this.cover(1), description: 'La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que explora temas de soledad, amor y destino.', pages: 471, rating: 4.8, year: 1967, language: 'Español', progress: 75, state: 'reading', dateAdded: '2024-01-15' },
      { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'Clásico', cover: this.cover(2), description: 'Las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza. La primera novela moderna y una de las obras más influyentes de la literatura universal.', pages: 863, rating: 4.7, year: 1605, language: 'Español', progress: 30, state: 'reading', dateAdded: '2024-02-20' },
      { id: 3, title: '1984', author: 'George Orwell', genre: 'Distopía', cover: this.cover(3), description: 'En un mundo totalitario donde el Gran Hermano todo lo ve, Winston Smith lucha por mantener su humanidad. Una profecía escalofriante sobre el poder y la vigilancia.', pages: 328, rating: 4.6, year: 1949, language: 'Inglés', progress: 100, state: 'completed', review: 'Una obra que se siente más relevante que nunca.', dateAdded: '2023-11-10' },
      { id: 4, title: 'El Principito', author: 'Antoine de Saint-Exupéry', genre: 'Fábula', cover: this.cover(4), description: 'Un piloto perdido en el desierto del Sahara encuentra a un pequeño príncipe de otro planeta. Una historia sobre la amistad, el amor y lo esencial invisible a los ojos.', pages: 96, rating: 4.9, year: 1943, language: 'Francés', progress: 100, state: 'completed', dateAdded: '2023-09-05' },
      { id: 5, title: 'Rayuela', author: 'Julio Cortázar', genre: 'Experimental', cover: this.cover(5), description: 'Horacio Oliveira busca el sentido de la vida entre París y Buenos Aires. Una novela que se puede leer de múltiples formas, revolucionando la narrativa.', pages: 600, rating: 4.5, year: 1963, language: 'Español', state: 'want-to-read', dateAdded: '2024-03-01' },
      { id: 6, title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', genre: 'Misterio', cover: this.cover(6), description: 'Daniel Sempere descubre un libro maldito en el Cementerio de los Libros Olvidados. Un misterio que se desarrolla en la Barcelona de posguerra.', pages: 487, rating: 4.6, year: 2001, language: 'Español', progress: 50, state: 'reading', dateAdded: '2024-01-20' },
      { id: 7, title: 'Pedro Páramo', author: 'Juan Rulfo', genre: 'Realismo Mágico', cover: this.cover(7), description: 'Juan Preciado viaja a Comala en busca de su padre Pedro Páramo, solo para encontrar un pueblo fantasma. Obra fundamental del realismo mágico mexicano.', pages: 124, rating: 4.4, year: 1955, language: 'Español', progress: 100, state: 'completed', dateAdded: '2023-12-01' },
      { id: 8, title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Ciencia Ficción', cover: this.cover(8), description: 'En un futuro donde los libros están prohibidos y los bomberos los queman, Guy Montag comienza a cuestionar todo. Una defensa apasionada de la literatura.', pages: 249, rating: 4.5, year: 1953, language: 'Inglés', state: 'want-to-read', dateAdded: '2024-02-15' },
      { id: 9, title: 'La Casa de los Espíritus', author: 'Isabel Allende', genre: 'Realismo Mágico', cover: this.cover(9), description: 'La saga de la familia Trueba-Del Valle a través de cuatro generaciones en Chile. Amor, política y lo sobrenatural se entrelazan en esta épica.', pages: 433, rating: 4.5, year: 1982, language: 'Español', progress: 20, state: 'reading', dateAdded: '2024-03-10' },
      { id: 10, title: 'El Alquimista', author: 'Paulo Coelho', genre: 'Aventura', cover: this.cover(10), description: 'Santiago, un joven pastor andaluz, emprende un viaje en busca de un tesoro en las pirámides de Egipto. Una parábola sobre seguir tus sueños.', pages: 208, rating: 4.3, year: 1988, language: 'Portugués', progress: 100, state: 'completed', dateAdded: '2023-08-20' },
      { id: 11, title: 'Crimen y Castigo', author: 'Fiódor Dostoyevski', genre: 'Clásico', cover: this.cover(11), description: 'Raskólnikov comete un asesinato y debe enfrentar las consecuencias morales y psicológicas de su acto. Una exploración profunda de la culpa y la redención.', pages: 671, rating: 4.6, year: 1866, language: 'Ruso', state: 'want-to-read', dateAdded: '2024-04-01' },
      { id: 12, title: 'Crónica de una Muerte Anunciada', author: 'Gabriel García Márquez', genre: 'Novela Corta', cover: this.cover(12), description: 'Todo el pueblo sabía que Santiago Nasar iba a morir, pero nadie hizo nada para impedirlo. Un relato magistral sobre el honor y la fatalidad.', pages: 120, rating: 4.5, year: 1981, language: 'Español', progress: 100, state: 'completed', dateAdded: '2023-10-15' },
      { id: 13, title: 'El Nombre de la Rosa', author: 'Umberto Eco', genre: 'Misterio', cover: this.cover(13), description: 'Fray Guillermo de Baskerville investiga muertes misteriosas en una abadía medieval. Un thriller intelectual que mezcla teología, filosofía y detective noir.', pages: 512, rating: 4.4, year: 1980, language: 'Italiano', state: 'want-to-read', dateAdded: '2024-02-28' },
      { id: 14, title: 'Tokio Blues', author: 'Haruki Murakami', genre: 'Romance', cover: this.cover(14), description: 'Toru Watanabe recuerda sus días universitarios en Tokio, atrapado entre dos mujeres y marcado por la pérdida. Una historia de amor y melancolía.', pages: 386, rating: 4.3, year: 1987, language: 'Japonés', progress: 65, state: 'reading', dateAdded: '2024-01-05' },
      { id: 15, title: 'Ficciones', author: 'Jorge Luis Borges', genre: 'Cuentos', cover: this.cover(15), description: 'Una colección de cuentos que exploran laberintos, bibliotecas infinitas y mundos paralelos. Borges crea universos enteros en pocas páginas.', pages: 174, rating: 4.7, year: 1944, language: 'Español', progress: 100, state: 'completed', dateAdded: '2023-07-12' },
      { id: 16, title: 'Dune', author: 'Frank Herbert', genre: 'Ciencia Ficción', cover: this.cover(16), description: 'Paul Atreides debe sobrevivir en Arrakis, fuente de la sustancia más valiosa del universo. Política, religión y ecología en una épica sci-fi inigualable.', pages: 688, rating: 4.6, year: 1965, language: 'Inglés', state: 'want-to-read', dateAdded: '2024-03-20' },
      { id: 17, title: 'La Metamorfosis', author: 'Franz Kafka', genre: 'Ficción', cover: this.cover(17), description: 'Gregor Samsa despierta convertido en un insecto gigante. Una alegoría sobre la alienación, la familia y la condición humana.', pages: 70, rating: 4.4, year: 1915, language: 'Alemán', progress: 100, state: 'completed', dateAdded: '2023-11-25' },
      { id: 18, title: 'El Amor en los Tiempos del Cólera', author: 'Gabriel García Márquez', genre: 'Romance', cover: this.cover(18), description: 'Florentino Ariza espera más de medio siglo para declarar su amor a Fermina Daza. Una historia épica de amor eterno en el Caribe colombiano.', pages: 348, rating: 4.5, year: 1985, language: 'Español', progress: 40, state: 'reading', dateAdded: '2024-02-01' },
      { id: 19, title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasía', cover: this.cover(19), description: 'Bilbo Bolsón es arrastrado a una aventura épica con enanos y un mago para recuperar un tesoro custodiado por un dragón. El inicio de la Tierra Media.', pages: 310, rating: 4.7, year: 1937, language: 'Inglés', progress: 100, state: 'completed', dateAdded: '2023-06-10' },
      { id: 20, title: 'Como Agua para Chocolate', author: 'Laura Esquivel', genre: 'Realismo Mágico', cover: this.cover(20), description: 'Tita De la Garza canaliza sus emociones a través de la cocina. Una novela donde la gastronomía y la pasión se funden mágicamente.', pages: 246, rating: 4.3, year: 1989, language: 'Español', state: 'want-to-read', dateAdded: '2024-04-05' },
    ];
  }

  getCategories(): string[] {
    return ['Realismo Mágico', 'Clásico', 'Distopía', 'Fábula', 'Experimental', 'Misterio', 'Ciencia Ficción', 'Romance', 'Cuentos', 'Fantasía', 'Ficción', 'Novela Corta', 'Aventura'];
  }

  getClubs(): Club[] {
    return [
      { id: 1, name: 'Club García Márquez', description: 'Exploramos la obra completa del Nobel colombiano. Desde Macondo hasta el Caribe, cada mes un libro diferente del maestro del realismo mágico.', bookId: 1, coverImage: this.cover(21), members: this.generateMembers(1, 12), maxMembers: 20, category: 'Realismo Mágico', createdAt: '2023-06-15', ownerId: 1, isPublic: true, nextSession: '2024-05-20' },
      { id: 2, name: 'Sci-Fi Explorers', description: 'Para los que ven el futuro en cada página. Discutimos ciencia ficción clásica y contemporánea, desde Asimov hasta los más nuevos.', bookId: 16, coverImage: this.cover(22), members: this.generateMembers(2, 8), maxMembers: 15, category: 'Ciencia Ficción', createdAt: '2023-09-01', ownerId: 2, isPublic: true, nextSession: '2024-05-22' },
      { id: 3, name: 'Clásicos Inmortales', description: 'Los grandes de la literatura que trascienden el tiempo. De Cervantes a Dostoyevski, revisitamos las obras que definieron la cultura.', bookId: 2, coverImage: this.cover(23), members: this.generateMembers(3, 15), maxMembers: 25, category: 'Clásico', createdAt: '2023-03-10', ownerId: 3, isPublic: true, nextSession: '2024-05-18' },
      { id: 4, name: 'Misterios & Thrillers', description: 'Si te gustan los giros inesperados y las noches sin dormir por terminar un capítulo, este es tu club.', bookId: 6, coverImage: this.cover(24), members: this.generateMembers(4, 10), maxMembers: 18, category: 'Misterio', createdAt: '2023-11-20', ownerId: 4, isPublic: true, nextSession: '2024-05-25' },
      { id: 5, name: 'Latinoamérica Lee', description: 'Celebramos la riqueza literaria de América Latina. Boom, post-boom y las nuevas voces de nuestra narrativa continental.', bookId: 5, coverImage: this.cover(25), members: this.generateMembers(5, 18), maxMembers: 30, category: 'Realismo Mágico', createdAt: '2023-01-05', ownerId: 5, isPublic: true, nextSession: '2024-05-19' },
      { id: 6, name: 'Mundos Fantásticos', description: 'Elfos, dragones, magia y mundos imposibles. Desde Tolkien hasta Sanderson, exploramos la fantasía épica.', bookId: 19, coverImage: this.cover(26), members: this.generateMembers(6, 14), maxMembers: 20, category: 'Fantasía', createdAt: '2023-07-22', ownerId: 6, isPublic: true, nextSession: '2024-05-21' },
      { id: 7, name: 'Café Literario Murakami', description: 'Para los amantes de la prosa onírica de Murakami. Jazz, gatos y mundos paralelos.', bookId: 14, coverImage: this.cover(27), members: this.generateMembers(7, 9), maxMembers: 15, category: 'Romance', createdAt: '2024-01-10', ownerId: 7, isPublic: true, nextSession: '2024-05-23' },
      { id: 8, name: 'Distopías del Mañana', description: 'Orwell, Huxley, Bradbury y más. Analizamos las visiones del futuro que nos advierten sobre el presente.', bookId: 3, coverImage: this.cover(28), members: this.generateMembers(8, 11), maxMembers: 20, category: 'Distopía', createdAt: '2023-10-05', ownerId: 8, isPublic: true, nextSession: '2024-05-24' },
    ];
  }

  getCommentsByClub(clubId: number): Comment[] {
    const allComments: Comment[] = [
      { id: 1, userId: 2, userName: 'María López', userAvatar: this.avatars[1], content: '¡Qué capítulo tan increíble! La forma en que García Márquez describe la lluvia de flores amarillas me dejó sin palabras.', createdAt: '2024-05-15T10:30:00', clubId: 1 },
      { id: 2, userId: 3, userName: 'Carlos Ruiz', userAvatar: this.avatars[2], content: 'Estoy leyendo Cien Años por tercera vez y sigo descubriendo detalles nuevos.', createdAt: '2024-05-15T11:45:00', clubId: 1 },
      { id: 3, userId: 4, userName: 'Ana Martínez', userAvatar: this.avatars[3], content: '¿Alguien más notó la conexión entre Úrsula y la persistencia de la memoria?', createdAt: '2024-05-16T09:15:00', clubId: 1 },
      { id: 4, userId: 5, userName: 'Pedro Sánchez', userAvatar: this.avatars[4], content: 'Dune me voló la cabeza. Herbert creó un universo político tan complejo como el real.', createdAt: '2024-05-14T14:20:00', clubId: 2 },
      { id: 5, userId: 6, userName: 'Laura García', userAvatar: this.avatars[5], content: 'La parte de la ecología de Arrakis es increíble. ¿Cuánto investigó Herbert para escribir esto?', createdAt: '2024-05-14T16:00:00', clubId: 2 },
      { id: 6, userId: 1, userName: 'Joseph Antony', userAvatar: this.avatars[0], content: 'El Quijote sigue siendo la novela más moderna que he leído. Cervantes se adelantó siglos.', createdAt: '2024-05-13T10:00:00', clubId: 3 },
      { id: 7, userId: 7, userName: 'Sofía Torres', userAvatar: this.avatars[6], content: 'El giro final de La Sombra del Viento me dejó temblando. ¡No lo vi venir!', createdAt: '2024-05-12T20:30:00', clubId: 4 },
      { id: 8, userId: 8, userName: 'Diego Ramírez', userAvatar: this.avatars[7], content: 'Rayuela debería ser obligatoria. La forma en que rompe la narrativa lineal es revolucionaria.', createdAt: '2024-05-11T15:45:00', clubId: 5 },
    ];
    return allComments.filter(c => c.clubId === clubId);
  }

  getCurrentUser(): User {
    return { id: 1, name: 'Joseph Antony', email: 'jose@readingclub.com', avatar: this.avatars[0], favoriteGenres: ['Realismo Mágico', 'Ciencia Ficción', 'Clásico'], booksRead: 42, clubsJoined: 3, memberSince: '2023-01-01' };
  }

  getBookById(id: number): Book | undefined { return this.getBooks().find(b => b.id === id); }
  getClubById(id: number): Club | undefined { return this.getClubs().find(c => c.id === id); }
  getUserLibrary(): Book[] { return this.getBooks().filter(b => b.state !== undefined); }

  private generateMembers(clubId: number, count: number): ClubMember[] {
    const names = ['Joseph Antony', 'María López', 'Carlos Ruiz', 'Ana Martínez', 'Pedro Sánchez', 'Laura García', 'Sofía Torres', 'Diego Ramírez', 'Valentina Cruz', 'Andrés Mejía', 'Camila Reyes', 'Rodrigo Vargas', 'Isabella Moreno', 'Santiago Herrera', 'Lucía Fernández', 'Mateo Castillo', 'Elena Rojas', 'Sebastián Luna'];
    const members: ClubMember[] = [];
    for (let i = 0; i < Math.min(count, names.length); i++) {
      members.push({ id: i + 1, name: names[i], avatar: this.avatars[i % this.avatars.length], role: i === 0 ? 'owner' : (i === 1 ? 'moderator' : 'member'), joinedAt: `2024-0${(i % 4) + 1}-${(i % 28) + 1}` });
    }
    return members;
  }
}
