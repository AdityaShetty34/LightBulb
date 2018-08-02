/********************************************************************
 * FileName:     light.go
 * Project:      LitmNB
 * Module:       controllers
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/

package controllers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"

	m "github.com/LitmNWS/app/models"
	"github.com/revel/revel"
)

type Light struct {
	*revel.Controller
}

type PowerPayload struct {
	DeviceID string `json:"deviceID"`
	Command  string `json:"command"`
}

type BrightnessPayload struct {
	DeviceID string `json:"deviceID"`
	DimVal   string `json:"dimVal"`
}

type Response struct {
	Status string `json:"status"`
}

type Payload struct {
	Opr          string     `json:"opr"`
	IsOn         bool       `json:"isOn"`
	LightID      string     `json:"light_id"`
	DimVal       string     `json:"dimVal"`
	CCTVal       string     `json:"cctVal"`
	ScheduleList []Schedule `json:"schedule_list"`
}

type Schedule struct {
	Dim       string `json:"dim"`
	CCT       string `json:"cct"`
	StartTime string `json:"startTime"`
}

type LightData struct {
	Id          uint64
	Lid         string  `json:"lid", db:"light_id"`
	Power       int64   `json:"power", db:"power"`
	Cct         int64   `json:"cct", db:"cct"`
	Intensity   int64   `json:"intensity", db:"intensity"`
	Voltage     float64 `json:"voltage", db:"voltage"`
	Temperature int64   `json:"temperature", db:"temperature"`
	//Ambient_temp string  `json:"ambient_temp", db:"ambient_temp"`
	Ambient_temp float64 `json:"ambient_temp", db:"ambient_temp"`
	Current      float64 `json:"current", db:"current"`
	Consumed     int64   `json:"consumed", db:"consumed"`
	Baseline     int     `json:"baseline", db:"baseline"`
	Cmd          string  `json:"cmd", db:"cmd"`
	Time         string  `json:"time", db:"time"`
}

type LightReqData struct {
	Parameter  string      `json:"parameter"`
	Parameter2 string      `json:"parameter2"`
	Freq       string      `json:"frequency"`
	Period     interface{} `json:"period"`
}

type LdbData struct {
	TimeStamp string      `json:"time"`
	Value     interface{} `json:"value"`
	//Value     float64 `json:"value"`
}

const (
	NWSLightUrl = "http://localhost:9000"
)

func (c Light) LightControl() revel.Result {
	return c.Render()
}

func (c Light) LightMonitor() revel.Result {
	return c.Render()
}

func (c Light) Historical() revel.Result {
	return c.Render()
}

func (c Light) SetPower() revel.Result {
	log.Println("Litm Platform  : Method:Set Power..... ")
	var response Response
	var requestPayload Payload

	var storeTheData m.RequestData //To store the data in db for analysis
	storeTheData.RequestMethod = "SetPower"
	storeTheData.Status = "failed"
	loc, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		log.Println("Litm NWS  :Error getting location", err)
		t1 := time.Now()
		storeTheData.InTime = t1.Add(time.Minute * 330)
	} else {
		storeTheData.InTime = time.Now().In(loc)
	}

	c.Params.BindJSON(&requestPayload)
	//log.Println("requestPayload:", requestPayload)

	lightID := c.Params.Get("light_id")
	isOn := c.Params.Get("isOn")
	opr := c.Params.Get("opr")
	dimVal := c.Params.Get("dimVal")
	cctVal := c.Params.Get("cctVal")

	log.Println("Litm Platform  : light_id =", lightID)
	log.Println("Litm Platform  : isOn =", isOn)
	log.Println("Litm Platform  : opr =", opr)
	log.Println("Litm Platform  : dimVal =", dimVal)
	log.Println("Litm Platform  : cctVal =", cctVal)

	if requestPayload.LightID == "" {
		requestPayload.LightID = lightID
		requestPayload.Opr = opr
		requestPayload.DimVal = dimVal
		requestPayload.CCTVal = cctVal
		if isOn == "true" {
			requestPayload.IsOn = true
		}

	}

	/*
		if isOn == "true" {
			requestPayload.IsOn = true
		}
	*/
	//c.Params.BindJSON(&requestPayload)

	log.Println("Litm Platform  : requestPayload:", requestPayload)

	if requestPayload.LightID == "" {
		c.Response.Status = 400
		log.Println("Litm Platform  : Light ID is empty.....")
		response.Status = "LightID cannot be empty"
		storeTheData.OutTime = time.Now().In(loc)
		m.StoreRequestData(storeTheData, requestPayload)
		return c.RenderJSON(response)
	}

	if requestPayload.Opr == "" {
		c.Response.Status = 400
		log.Println("Litm Platform  : Opr is empty.....")
		response.Status = "Operation cannot be empty"
		storeTheData.OutTime = time.Now().In(loc)
		m.StoreRequestData(storeTheData, requestPayload)
		return c.RenderJSON(response)
	}

	url := NWSLightUrl + "/v1/litmNS/gateways/lights"
	jsonStr, _ := json.Marshal(requestPayload)
	log.Println("Litm Platform  : Request sent to network server.....")
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer resp.Body.Close()
	log.Println("Litm Platform  : Response recieved from network server.....")
	//log.Println("Litm Platform  : resp body", resp.Body)

	json.NewDecoder(resp.Body).Decode(&response)
	storeTheData.Status = "Success"
	storeTheData.OutTime = time.Now().In(loc)
	m.StoreRequestData(storeTheData, requestPayload)
	return c.RenderJSON(response)

}

func (c Light) SetPowerFromNB(lightID string) revel.Result {
	log.Println("Litm Platform  : Method:SetPowerFromNB..... ")
	var response Response
	var requestPayload Payload

	var storeTheData m.RequestData //To store the data in db for analysis
	storeTheData.RequestMethod = "SetPowerFromNB"
	storeTheData.Status = "failed"
	loc, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		log.Println("Litm NWS  :Error getting location", err)
		t1 := time.Now()
		storeTheData.InTime = t1.Add(time.Minute * 330)
	} else {
		storeTheData.InTime = time.Now().In(loc)
	}

	c.Params.BindJSON(&requestPayload)
	//log.Println("requestPayload:", requestPayload)

	requestPayload.LightID = lightID

	log.Println("Litm Platform  : light_id =", requestPayload.LightID)
	log.Println("Litm Platform  : isOn =", requestPayload.IsOn)
	log.Println("Litm Platform  : opr =", requestPayload.Opr)
	log.Println("Litm Platform  : dimVal =", requestPayload.DimVal)
	log.Println("Litm Platform  : cctVal =", requestPayload.CCTVal)

	log.Println("Litm Platform  : requestPayload:", requestPayload)

	if requestPayload.LightID == "" {
		c.Response.Status = 400
		log.Println("Litm Platform  : Light ID is empty.....")
		response.Status = "LightID cannot be empty"
		storeTheData.OutTime = time.Now().In(loc)
		m.StoreRequestData(storeTheData, requestPayload)
		return c.RenderJSON(response)
	}

	if requestPayload.Opr == "" {
		c.Response.Status = 400
		log.Println("Litm Platform  : Opr is empty.....")
		response.Status = "Operation cannot be empty"
		storeTheData.OutTime = time.Now().In(loc)
		m.StoreRequestData(storeTheData, requestPayload)
		return c.RenderJSON(response)
	}

	url := NWSLightUrl + "/v1/litmNS/gateways/lights"
	jsonStr, _ := json.Marshal(requestPayload)
	log.Println("Litm Platform  : Request sent to network server.....")
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer resp.Body.Close()
	log.Println("Litm Platform  : Response recieved from network server.....")
	//log.Println("Litm Platform  : resp body", resp.Body)

	json.NewDecoder(resp.Body).Decode(&response)
	storeTheData.Status = "Success"
	storeTheData.OutTime = time.Now().In(loc)
	m.StoreRequestData(storeTheData, requestPayload)
	return c.RenderJSON(response)

}

func (c Light) GetLightStatus(lightID string) revel.Result {
	log.Println("Litm Platform  : Method:GetLightData..... ")

	var lightData LightData

	log.Println("Litm Platform  : Requesting Litm Network Server to fetch the lightData.....")
	requestUrl := NWSLightUrl + "/v1/litmNS/devices/lightStatus/" + lightID
	request, err := http.NewRequest("GET", requestUrl, bytes.NewBuffer(nil))

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer response.Body.Close()

	//log.Println("Litm Platform  : resp body", resp.Body)

	json.NewDecoder(response.Body).Decode(&lightData)
	log.Println("Litm Platform  : Response recieved from network server:", lightData)
	return c.RenderJSON(lightData)

}

func (c Light) GetLightData() revel.Result {
	log.Println("Litm Platform  : Method:GetLightData..... ")

	var lightData LightData

	log.Println("Litm Platform  : Requesting Litm Network Server to fetch the lightData.....")
	requestUrl := NWSLightUrl + "/v1/litmNS/devices/lightData"
	request, err := http.NewRequest("GET", requestUrl, bytes.NewBuffer(nil))

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer response.Body.Close()

	//log.Println("Litm Platform  : resp body", resp.Body)

	json.NewDecoder(response.Body).Decode(&lightData)
	log.Println("Litm Platform  : Response recieved from network server:", lightData)
	return c.RenderJSON(lightData)

}

//Get historical data
func (c *Light) GetHistoricalData(lightID string) revel.Result {
	log.Println("Litm Platform  : Method:GetHistoricalData..... ")
	log.Println("Litm Platform  : lightID is: ", lightID)
	var request LightReqData
	if err := json.Unmarshal(c.Params.JSON, &request); err != nil {
		log.Println("Litm Platform  :Error binding params: ", err)
		c.Response.Status = 400
		return c.RenderJSON("Invalid Request")
	}
	log.Println("Litm Platform  :Request is: ", request)

	url := NWSLightUrl + "/v1/litmNS/devices/" + lightID + "/historicalLightData"
	log.Println(url)
	jsonStr, _ := json.Marshal(request)

	log.Println("Litm Platform  : Request sent to network server.....")
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer resp.Body.Close()
	log.Println("Litm Platform  : Response recieved from network server.....")

	var response [][]LdbData
	json.NewDecoder(resp.Body).Decode(&response)
	log.Println("Litm Platform  : Response is:", response)

	return c.RenderJSON(response)
}

//Get historical data
func (c *Light) GetHistoricalDataForCSV(lightID string) revel.Result {
	log.Println("Litm Platform  : Method:GetHistoricalDataForCSV..... ")
	log.Println("Litm Platform  : lightID is: ", lightID)
	var request LightReqData
	if err := json.Unmarshal(c.Params.JSON, &request); err != nil {
		log.Println("Litm Platform  :Error binding params: ", err)
		c.Response.Status = 400
		return c.RenderJSON("Invalid Request")
	}
	log.Println("Litm Platform  :Request is: ", request)

	url := NWSLightUrl + "/v1/litmNS/devices/" + lightID + "/historicalLightDataforCSV"
	log.Println(url)
	jsonStr, _ := json.Marshal(request)

	log.Println("Litm Platform  : Request sent to network server.....")
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Litm Platform  : Error while making request to Network Server:", err)
	}
	defer resp.Body.Close()
	log.Println("Litm Platform  : Response recieved from network server.....")

	var response interface{}
	json.NewDecoder(resp.Body).Decode(&response)
	log.Println("Litm Platform  : Response is:", response)

	return c.RenderJSON(response)
}
