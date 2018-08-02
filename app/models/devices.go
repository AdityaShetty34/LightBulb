/********************************************************************
 * FileName:     devices.go
 * Project:      LitmNWS
 * Module:       models
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/

package models

import "log"

//To add the gateways to the db
type Devices struct {
	Id        uint64
	GatewayId string `db:"gateway_id" json:"gateway_id"`
	DeviceId  string `db:"device_id" json:"device_id"`
}

var DeviceGatewayMap = make(map[string]string)

func GetDeviceList(gateway_id string) (deviceList []string, err error) {

	if _, err = Dbm.Select(&deviceList, "SELECT device_id FROM devices WHERE gateway_id=?", gateway_id); err != nil {
		log.Println("Error in report:", err)

		return
	}
	return

}

func UpdateDeviceGateway() {
	var devices []Devices
	if _, err := Dbm.Select(&devices, "SELECT * FROM devices"); err != nil {
		log.Println("Error in report:", err)
	}

	for k, _ := range devices {
		DeviceGatewayMap[devices[k].DeviceId] = devices[k].GatewayId
	}
}
