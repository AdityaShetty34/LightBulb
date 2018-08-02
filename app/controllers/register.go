/********************************************************************
 * FileName:     register.go
 * Project:      LitmNWS
 * Module:       controllers
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/

package controllers

import (
	"log"

	m "github.com/LitmNB/app/models"
	"github.com/revel/revel"
)

type Register struct {
	*revel.Controller
}

type ResponseIfExist struct {
	Status string `json:"status"`
}

type DeviceResp struct {
	Status     string   `json:"status"`
	DeviceList []string `json:"deviceList"`
}

type GatewayRequest struct {
	GatewayID string `json:"gatewayId"`
	//GatewayURL string `json:"gatewayUrl"`
}

var getwayMap = make(map[string]bool)

func (c Register) CheckIfRegistered(gatewayID string) revel.Result {
	log.Println("Litm Platform  : Method: CheckIfRegistered.....")
	var response ResponseIfExist

	log.Println("Litm Platform  : gatewayID is ", gatewayID)
	if gatewayID != "" {
		log.Println("Litm Platform  : Checking if gateway is registered in Litm DB.....")
		ifExist, err := m.CheckGateway(gatewayID)
		if err != nil {
			c.Response.Status = 500
			log.Println("Litm Platform  : Error while performing DB operation:", err)
			response.Status = "Internal Server Error"
			return c.RenderJSON(response)
		}

		if ifExist {
			getwayMap[gatewayID] = true
			log.Println("Litm Platform  : Gateway is registered in Litm DB.....")
			c.Response.Status = 200
			response.Status = "Success"
			return c.RenderJSON(response)
		}
		c.Response.Status = 400
		log.Println("Litm Platform  : Device is not registered by the user.....")
		response.Status = "Device is not registered by the user"
		return c.RenderJSON(response)
	}

	c.Response.Status = 400
	log.Println("Litm Platform  : Gateway ID is empty.....")
	response.Status = "Gateway ID cannot be empty"
	return c.RenderJSON(response)
}

func (c Register) GetDeviceList(gatewayID string) revel.Result {
	log.Println("Litm Platform  : Method: GetDeviceList.....")
	var response DeviceResp

	log.Println("Litm Platform  : gateway_id:", gatewayID)

	log.Println("Litm Platform  : Fetching devices from Litm DB.....")
	data, err := m.GetDeviceList(gatewayID)

	if err != nil {
		c.Response.Status = 500
		log.Println("Litm Platform  : Error in DB operation:", err)
		response.Status = "Internal Server Error"
		return c.RenderJSON(&response)
	}

	if len(data) == 0 {
		c.Response.Status = 404
		log.Println("Litm Platform  : No devices found for this gateway.....")
		response.Status = "no devices"
		return c.RenderJSON(&response)
	}

	log.Println("Litm Platform  : Device list fetched from from Litm DB.....")
	response.DeviceList = data
	c.Response.Status = 200
	response.Status = "success"
	return c.RenderJSON(&response)
}
