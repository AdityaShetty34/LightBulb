/********************************************************************
 * FileName:     gateway.go
 * Project:      LitmNWS
 * Module:       models
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/

package models

import "log"

//Gateway: To add the gateways to the db
type Gateway struct {
	Id         uint64
	GatewayId  string `db:"gateway_id" json:"gateway_id"`
	GatewayURL string `db:"gateway_url" json:"gateway_url"`
}

//CheckGateway: To check if the gateway is preapproved by the user
func CheckGateway(gatewayID string) (ifExist bool, err error) {
	log.Println("Litm NB : Method: CheckGateway.....", gatewayID)
	var id []uint64
	if _, err = Dbm.Select(&id, "SELECT ID FROM gateway WHERE gateway_id=?", gatewayID); err != nil {
		log.Println("Error in report:", err)
		ifExist = false
		return
	} else if len(id) != 0 {
		log.Println("Gateway found")
		ifExist = true
		return
	}
	ifExist = false
	return
}

//UpdateGatewayURL: To update the url for the gateway
func UpdateGatewayURL(gatewayID, gatewayURL string) {

	if _, err := Dbm.Exec("UPDATE gateway set gateway_url=? WHERE gateway_id=?", gatewayURL, gatewayID); err != nil {
		log.Println("Error while updating:", err)
	}
}
