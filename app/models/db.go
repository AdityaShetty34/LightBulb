/********************************************************************
 * FileName:     db.go
 * Project:      LitmNB
 * Module:       models
 * Company:      Havells India Limited
 * Developed by: Chipmonk Technologies Private Limited
 * Copyright and Disclaimer Notice Software:
 ********************************************************************/
package models

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/go-gorp/gorp"
	"github.com/revel/revel"
)

var (
	// Dbm is db handle
	Dbm *gorp.DbMap
)

func init() {
	initDB()
	updateModels()
	UpdateDeviceGateway()
}

func initDB() {
	var dbInfo string

	log.Println("RUNNING IN PROD MODE. DATABASE WILL BE RDS")

	dbInfo = "HavellsDBAdmin:HavellsCCMS420@tcp(mysql.cqwf1pvghoch.us-west-2.rds.amazonaws.com:3306)/LitmDB"

	Db, err := sql.Open("mysql", dbInfo)
	if Db == nil || err != nil {
		revel.ERROR.Println("could not connect to mysql", dbInfo)
		panic(err)
	}
	Dbm = &gorp.DbMap{Db: Db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}
}

func updateModels() {

	setColumnSizes := func(t *gorp.TableMap, colSizes map[string]int) {
		for col, size := range colSizes {
			t.ColMap(col).MaxSize = size
		}
	}
	t := Dbm.AddTableWithName(Gateway{}, "gateway").SetKeys(true, "Id")
	setColumnSizes(t, map[string]int{
		"gateway_url": 500,
	})

	t = Dbm.AddTableWithName(Devices{}, "devices").SetKeys(true, "Id")
	t = Dbm.AddTableWithName(RequestData{}, "request_data").SetKeys(true, "Id")
	setColumnSizes(t, map[string]int{
		"parameter": 500,
	})
	Dbm.TraceOn("[gorp]", revel.INFO)
	err := Dbm.CreateTablesIfNotExists()
	revel.INFO.Println("Error in creating table:", err)
}
