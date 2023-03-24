describe("Note ", function () {
  beforeEach(function () {
    cy.reset_db();
    cy.create_user({
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get("#notification").contains("wrong username/password");
      cy.get("#notification").should("have.css", "border-style", "solid");
      cy.get("#notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.log_in("mluukkai", "salainen");
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type(
        "Authenticate faster in tests with the cy.session command"
      );
      cy.get("#author").type("The Cypress team");
      cy.get("#url").type(
        "https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/"
      );
      cy.contains("create").click();

      cy.contains(
        "Authenticate faster in tests with the cy.session command"
      ).click();
    });
  });

  describe("When a blog exists", function () {
    beforeEach(function () {
      cy.log_in("mluukkai", "salainen");

      cy.create_blog({
        title: "Authenticate faster in tests with the cy.session command",
        author:
          "https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/",
        url: "https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/",
      });

      /*
        cy.contains('new note').click()
        cy.get('#title').type('Authenticate faster in tests with the cy.session command')
        cy.get('#author').type('The Cypress team')
        cy.get('#url').type('https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/')
        cy.contains('create').click()
        */
    });

    it("it can be liked", function () {
      cy.contains("view").click();
      cy.contains("0 likes");
      cy.contains("like").click();
      cy.contains("1 likes");
    });

    it("creator can remove it", function () {
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("The Cypress team").should("not.exist");
    });

    it("other users can not remove it", function () {
      cy.create_user({
        name: "Kalle Ilves",
        username: "ilves",
        password: "lynx",
      });

      cy.contains("logout").click();

      cy.log_in("ilves", "lynx");

      cy.contains("view").click();
      cy.contains("remove").should("not.exist");
    });
  });

  describe("are ordered by likes", function () {
    it("worx", () => {
      cy.log_in("mluukkai", "salainen");

      cy.create_blog({
        title: "blog A",
        author: "Antti",
        url: "http://aaa.fi",
      });
      cy.create_blog({
        title: "blog B",
        author: "Bettiina",
        url: "http://aaa.fi",
      });

      cy.create_blog({
        title: "blog C",
        author: "Cecilia",
        url: "http://ccc.fi",
      });

      cy.get("#notification").should("not.exist");

      cy.contains("blog A").contains("view").click();
      cy.contains("blog A").contains("like").as("like_a");

      cy.contains("blog B").contains("view").click();
      cy.contains("blog B").contains("like").as("like_b");

      cy.contains("blog C").contains("view").click();
      cy.contains("blog C").contains("like").as("like_c");

      cy.get("@like_a").click();
      cy.contains("you liked 'blog A'");
      cy.get("#notification").should("not.exist");

      cy.get("@like_b").click();
      cy.contains("you liked 'blog B'");
      cy.get("#notification").should("not.exist");

      cy.get("@like_b").click();
      cy.contains("you liked 'blog B'");
      cy.get("#notification").should("not.exist");

      cy.get("@like_c").click();
      cy.contains("you liked 'blog C'");
      cy.get("#notification").should("not.exist");

      cy.get("@like_c").click();
      cy.contains("you liked 'blog C'");
      cy.get("#notification").should("not.exist");

      cy.get("@like_c").click();
      cy.contains("you liked 'blog C'");
      cy.get("#notification").should("not.exist");

      cy.get(".blog").then((blogs) => {
        expect(blogs.eq(0)).to.contain("blog C");
        expect(blogs.eq(1)).to.contain("blog B");
        expect(blogs.eq(2)).to.contain("blog A");
      });
    });
  });
});
