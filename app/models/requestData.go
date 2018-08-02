/********************************************************************
 * FileName:     requestData.go
 * Project:      LitmNB
 * Module:       models
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/

package models

import (
	"encoding/json"
	"log"
	"time"
)

//To add the litmdata to the db
type RequestData struct {
	Id            uint64
	RequestMethod string        `db:"req_method" json:"req_method"`
	Parameter     string        `db:"parameter"  json:"parameter"`
	InTime        time.Time     `db:"in_time"    json:"in_time"`
	OutTime       time.Time     `db:"out_time"   json:"out_time"`
	Difference    time.Duration `db:"diff"       json:"diff"`
	Status        string        `db:"status"     json:"status"`
}

func StoreRequestData(requestData RequestData, input interface{}) {
	inTime := requestData.InTime
	outTime := requestData.OutTime
	diff := outTime.Sub(inTime)
	jsnByte, err := json.Marshal(input)

	if err != nil {
		log.Println("LitmNWS : Error in marshalling", err)
	} else {
		requestData.Parameter = string(jsnByte)
	}

	if diff.Hours() < 2 { //
		requestData.Difference = diff
	}
	err = Dbm.Insert(&requestData)
	log.Println("LitmNWS : Error while inserting the data", err)
}
