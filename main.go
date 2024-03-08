package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	router.StaticFile("/favicon.ico", "./favicon.ico")
	router.Static("/dist", "./dist")
	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("templates/**/*")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/home", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home.html", nil)
	})
	router.GET("/about", func(c *gin.Context) {
		c.HTML(http.StatusOK, "about.html", nil)
	})
	router.GET("/project", func(c *gin.Context) {
		c.HTML(http.StatusOK, "project.html", nil)
	})
	router.GET("/study", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "study.html", nil)
	})
	router.GET("/guest", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "guest.html", nil)
	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown: ", err)
	}

	log.Println("Server exiting")
}
