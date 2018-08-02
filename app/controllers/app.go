/********************************************************************
 * FileName:     app.go
 * Project:      LitmNB
 * Module:       controllers
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/
package controllers

import (
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

/*
func (c App) Light() revel.Result {
	return c.Render()
}

func (c App) Monitor() revel.Result {
	return c.Render()
}
*/
