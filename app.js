class EntidadeBibliografica {
    constructor(codigo, titulo, autor, ano) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.isEmprestado = false;
        this.usuarioEmprestado = null;
    }
    
    emprestar(usuario) {
        if (!this.isEmprestado) {
            this.isEmprestado = true;
            this.usuarioEmprestado = usuario;
            console.log(`Item emprestado para ${usuario.nome}`);
        } else {
            console.log('Item já emprestado');
        }
    }

    devolver() {
        if (this.isEmprestado) {
            this.isEmprestado = false;
            this.usuarioEmprestado = null;
            console.log('Item devolvido');
        } else {
            console.log('Item não estava emprestado');
        }
    }
}

class Livro extends EntidadeBibliografica {
    constructor(codigo, titulo, autor, ano, genero) {
        super(codigo, titulo, autor, ano);
        this.genero = genero;
    }
}

class Revista extends EntidadeBibliografica {
    constructor(codigo, titulo, autor, ano) {
        super(codigo, titulo, autor, ano);
    }
}

class Usuario {
    constructor(nome, ra, dataNascimento) {
        this.nome = nome;
        this.ra = ra;
        this.dataNascimento = dataNascimento;
    }
}

class Biblioteca {
    constructor() {
        this.acervo = [];
        this.usuarios = [];
    }

    adicionarItem(item) {
        this.acervo.push(item);
        console.log(`${item.titulo} foi adicionado ao acervo.`);
    }

    listarAcervo() {
        const livros = this.acervo.filter(item => item instanceof Livro)
        const revistas = this.acervo.filter(item => item instanceof Revista)
    
        console.log('\n-- ACERVO DA BIBLIOTECA --')
        console.log('Livros:\n')
        livros.forEach((livro, index) => {
            console.log(`${index + 1}. Título: ${livro.titulo}, Autor: ${livro.autor}, Ano: ${livro.ano} - ${livro.isEmprestado ? 'Emprestado' : 'Disponível'}`)
        })
        console.log('Revistas:\n')
        revistas.forEach((revista, index) => {
            console.log(`${index + 1}. Título: ${revista.titulo}, Autor: ${revista.autor}, Ano: ${revista.ano} - ${revista.isEmprestado ? 'Emprestado' : 'Disponível'}`)
        })
    }
    

    adicionarUser(user) {
        const usuarioExistente = this.usuarios.find(u => u.ra === user.ra);
    
        if (usuarioExistente) {
            console.log(`Usuário com RA ${user.ra} já existe na biblioteca.`);
        } else {
            this.usuarios.push(user);
            console.log(`${user.nome} foi adicionado como usuário da biblioteca.`);
        }
    }
    
    emprestarItem(cod, raUsuario) {
        const item = this.acervo.find(item => item.codigo === cod);
    
        if (!item) {
            console.log('Item não encontrado.');
            return;
        }
    
        const usuario = this.usuarios.find(user => user.ra === raUsuario);
    
        if (!usuario) {
            console.log(`Usuário com RA ${raUsuario} não encontrado.`);
            return;
        }
    
        item.emprestar(usuario);
    }
    
    devolverItem(cod, raUsuario) {
        const item = this.acervo.find(item => item.codigo === cod);
    
        if (!item) {
            console.log('Item não encontrado.');
            return;
        }
    
        const usuario = this.usuarios.find(user => user.ra === raUsuario);
    
        if (!usuario) {
            console.log(`Usuário com RA ${raUsuario} não encontrado.`);
            return;
        }
    
        item.devolver();
    }
}

const Genero = {
    TERROR: 'Terror',
    COMEDIA: 'Comédia',
    FANTASIA: 'Fantasia',
    FICCAO: 'Ficção',
    SUSPENSE: 'Suspense',
    DRAMA: 'Drama',
    HISTORIA: 'História',
    POLICIAL: 'Policial',
    ROMANCE: 'Romance'
  };
    

const biblioteca = new Biblioteca();

const livros = [
    new Livro(1, 'Dom Casmurro', 'Machado de Assis', 1899, Genero.ROMANCE),
    new Livro(2, 'Harry Potter', 'J.K. Rowling', 1997, Genero.FANTASIA),
    new Livro(3, 'Eu, Robô', 'Isaac Asimov', 1950, Genero.FICCAO),
    new Livro(4, 'Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881, Genero.ROMANCE),
    new Livro(5, 'Vidas Secas', 'Graciliano Ramos', 1938, Genero.ROMANCE)
  ];

const revistas = [
    new Revista(6, 'National Geographic', 'Vários Autores', 2023),
    new Revista(7, 'Recreio', 'Vários Autores', 2023),
    new Revista(8, 'Super Interessante', 'Vários Autores', 2023),
    new Revista(9, 'Veja', 'Vários Autores', 2023),
    new Revista(10, 'Caras', 'Vários Autores', 2023)
];

const usuarios = [
    new Usuario('Fabiano', '111', '1993/06/21'),
    new Usuario('Felipe', '222', '2000/06/20'),
    new Usuario('Maurício', '333', '1995/09/08'),
    new Usuario('Pedro Henrique', '444', '2002/08/25'),
    new Usuario('Pedro Lucas', '555', '2004/03/10')
];

livros.forEach(livro => {
    biblioteca.adicionarItem(livro);
});
revistas.forEach(revista => {
    biblioteca.adicionarItem(revista);
});
usuarios.forEach(usuario => {
    biblioteca.adicionarUser(usuario);
});


biblioteca.listarAcervo(biblioteca)

biblioteca.emprestarItem(1, '111')

//tentaiva de emprestar para um usuário que não existe 

biblioteca.emprestarItem(6, '666')

//tentaiva de emprestar um item que já está emprestado 

biblioteca.emprestarItem(1, '222')

biblioteca.devolverItem(1, '111')