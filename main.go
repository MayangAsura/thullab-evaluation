package main

import (
	"fmt"
	"log"
	"os"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"

	"github.com/MayangAsura/thullab-evaluation/internal/database"
)

type apiConfig struct {
	DB *database.Queries
}

func main(){

	fmt.Println("hello from go")

	godotenv.Load()

	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("Port not found in the enviroment")

	}

	dbURL := os.Getenv("DB_URL")

	if dbURL != nil {
		log.Fatal("DB_URL not found in the environment")
	}

	conn, err := sql.Open("postgres", dbUrl)

	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	apiCnfg := apiConfig{
		DB: database.New(conn),
	}

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		ExposedHeaders: []string{"Link"},
		AllowCredentials: false,
		MaxAge: 300,
	}))

	v1Router := chi.NewRouter()

	v1Router.Get("/healthz", handlerReadiness)
	v1Router.Get("/err", handlerErr)
	v1Router.Post("/users", apiCnfg.handlerCreateUsers)
	// v1Router.HandleFunc("/healthz", handlerReadiness)

	router.Mount("/v1", v1Router)


	srv := &http.Server{
		Handler: router,
		Addr:		":" + portString,
	}

	log.Printf("Server is running on port %v", portString)
	err := srv.ListenAndServe()

	if err != nil {
		log.Fatal(err)
	}


	// fmt.Println("port:", portString)

}