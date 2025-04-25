const mysql = require('mysql');
const express = require('express')
const app = express()

///////////////////////////////////////
///////////////////////////////////////

const connInfo = {
    host: "localhost",
    user: "root",
    password: "",
    database: "coffee",
};

const PORT = 5500;

///////////////////////////////////////
///////////////////////////////////////

app.get('/addRoaster', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `roaster` (`name`, `location`, `website`) VALUES (?, ?, ?);"

            var params = [];
            if("rname" in req.query && "rlocation" in req.query && "rwebsite" in req.query){
                params.push(req.query["rname"]);
                params.push(req.query["rlocation"]);
                params.push(req.query["rwebsite"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/getRoasters', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            var sql = "SELECT r.name AS name, r.location AS loc, r.website as web, r.given_up as givenUp FROM roaster r ORDER BY givenUp ASC, name ASC";
            
            var params = {};
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"name":currentValue["name"], "loc":currentValue["loc"], "web": currentValue["web"], "givenUp": currentValue["givenUp"]};
                    }))
                }
            });
            
            conn.end()
        }
    });
});

// give up on a roaster
app.get('/giveUpRoaster', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            var sql = "UPDATE roaster SET given_up = 'yes' WHERE name = ? AND location = ? AND website = ?;"

            var params = [];
            if("rname" in req.query && "rlocation" in req.query && "rwebsite" in req.query){
                params.push(req.query["rname"]);
                params.push(req.query["rlocation"]);
                params.push(req.query["rwebsite"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addCountry', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `country` (`name`) VALUES (?);"

            var params = [];
            if("country_name" in req.query){
                params.push(req.query["country_name"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addGrower', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            var cidQuery = "SELECT c.id AS cid FROM country c WHERE c.name = ?";
            var insertQuery = "INSERT INTO `grower` (`name`, `region`, `farm_elevation`, `country_id`) VALUES (?, ?, ?, ?);"
            
            var paramsCID = [];
            paramsCID.push(req.query["grower_country"]);

            conn.query(cidQuery, paramsCID, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    // res.header("Access-Control-Allow-Origin", "*");

                    var InsertParams = [];
                    InsertParams.push(req.query["grower_name"]);
                    InsertParams.push(req.query["grower_reg"]);
                    InsertParams.push(req.query["grower_elev"]);
                    InsertParams.push(result[0].cid);

                    //insert query
                    conn.query(insertQuery, InsertParams, function(err, insertResult, fields) {
                        if (err) {
                            res.status(500).json({"msg":err.sqlMessage})
                        } else {
                            // for local testing only
                            // res.header("Access-Control-Allow-Origin", "*");
                        }
                    });  
                }
            });           
        }
    });
});

app.get('/addVarietal', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `varietal` (`name`) VALUES (?);"

            var params = [];
            if("var_name" in req.query){
                params.push(req.query["var_name"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addPM', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `processingmethod` (`name`) VALUES (?);"

            var params = [];
            if("pm_name" in req.query){
                params.push(req.query["pm_name"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addRL', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `roastlevel` (`level`) VALUES (?);"

            var params = [];
            if("rl_name" in req.query){
                params.push(req.query["rl_name"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});


app.get('/addNote', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `notes` (`name`) VALUES (?);"

            var params = [];
            if("note_name" in req.query){
                params.push(req.query["note_name"]);
            }
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addProduct', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `products` (`name`, `price`, `pro_meth_id`, `var_id`, `grower_id`, `roaster_id`, `rlevel_id`) VALUES (?, ?, ?, ?, ?, ?, ?);"

            var params = [];
            params.push(req.query["p_name"]);
            params.push(req.query["p_price"]);
            params.push(req.query["pm_id"]);
            params.push(req.query["vid"]);
            params.push(req.query["gid"]);
            params.push(req.query["rid"]);
            params.push(req.query["rl_id"]);
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addPN', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `productnotes` (`note_id`, `prod_id`) VALUES (?, ?);"

            var params = [];
            params.push(req.query["nid"]);
            params.push(req.query["pid"]);
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addBatch', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `batch` (`roast_date`, `prod_id`) VALUES (?, ?);"

            var params = [];
            params.push(req.query["rDate"]);
            params.push(req.query["batch_pid"]);
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

/* API endpoints for page3*/
app.get('/addBM', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `brewmethod` (`coffee_amount`, `grind_size`, `water_temp`, `bloom_count`, `water_amount`, `method`, `dairy_type`, `name`) VALUES (?, ? ,? ,? ,? ,? ,? ,? );"

            var params = [];
            params.push(req.query["c_a"]);
            params.push(req.query["gs"]);
            params.push(req.query["waterTemp"]);
            params.push(req.query["bc"]);
            params.push(req.query["wa"]);
            params.push(req.query["bm"]);
            params.push(req.query["dt"]);
            params.push(req.query["bm_name"]);
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addRating', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `rating` (`number`, `description`, `emoji`) VALUES (?, ? ,? );"

            var params = [];
            params.push(req.query["r_num"]);
            params.push(req.query["r_desc"]);
            params.push(req.query["r_emoji"]);
                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/updateRating', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "UPDATE `rating` SET `description` = ? WHERE `rating`.`number` = ?"

            var params = [];
            params.push(req.query["r_desc"]);
            params.push(req.query["r_num"]);
            
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addTasting', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `tasting` (`date`, `description`, `batch_id`, `rate_id`, `bm_id`) VALUES (?, ?, ?, ?, ?);"

            var params = [];
            params.push(req.query["t_date"]);
            params.push(req.query["t_desc"]);
            params.push(req.query["bid"]);
            params.push(req.query["rid"]);
            params.push(req.query["bm_id"]);

                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

app.get('/addTN', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "INSERT INTO `tastingnotes` (`note_id`, `taste_id`) VALUES (?, ?);"

            var params = [];
            params.push(req.query["nid"]);
            params.push(req.query["tid"]);

                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                }
            });
            conn.end()
        }
    });
});

/* page4 api endpoints */
app.get('/findGrowersCountry', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT g.id as gid, g.name as gname, g.region as greg, g.farm_elevation as gfe, c.name as cname FROM `grower` g INNER JOIN `country` c on g.country_id = c.id WHERE c.name = ?;"

            var params = [];
            params.push(req.query["cname"]);

                        
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"gid":currentValue["gid"], "gname":currentValue["gname"], "greg": currentValue["greg"], "gfe": currentValue["gfe"], "cname": currentValue["cname"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findTopProducts', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT p.name as pname, p.price as pprice, r.number as rnumber, r.description as rdesc FROM (products p INNER JOIN batch b ON p.id = b.prod_id) INNER JOIN tasting t on t.batch_id = b.id INNER JOIN rating r on r.id = t.rate_id WHERE r.number = (SELECT MAX(number) FROM `rating`);"
            params = {};
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"pname":currentValue["pname"], "pprice":currentValue["pprice"], "rnumber": currentValue["rnumber"], "rdesc": currentValue["rdesc"]};
                    }))
                }
            });
            conn.end()
        }
    });
});


app.get('/findTopVarietals', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT v.name AS vname, COUNT(v.name) AS count FROM varietal v INNER JOIN products p ON p.var_id = v.id INNER JOIN batch b ON p.id = b.prod_id INNER JOIN tasting t ON t.batch_id = b.id INNER JOIN rating r ON r.id = t.rate_id WHERE r.number IN ( SELECT DISTINCT number FROM ( SELECT number FROM rating ORDER BY number DESC LIMIT 2 ) AS top2 ) GROUP BY v.name;"
            params = {};
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"vname":currentValue["vname"], "count":currentValue["count"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findTastings', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT r.name as rname, p.name as pname, p.price as pprice, t.date as tdate, t.description as tdesc FROM roaster r INNER JOIN products p ON r.id = p.roaster_id INNER JOIN batch b ON p.id = b.prod_id INNER JOIN tasting t ON b.id = t.batch_id WHERE r.name = ? AND t.date > ? AND t.date < ?;"
            
            var params = [];
            params.push(req.query["rname"]);
            params.push(req.query["fdate"]);
            params.push(req.query["tdate"]);

            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"rname":currentValue["rname"], "pname":currentValue["pname"], "pprice":currentValue["pprice"], "tdate":currentValue["tdate"], "tdesc":currentValue["tdesc"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findProductsNotes', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT n.name AS note, rankedProducts.prodname as pname, rankedProducts.rank as prank FROM notes n INNER JOIN productnotes pn ON n.id = pn.note_id INNER JOIN( SELECT p.id AS prodid, p.name AS prodname, SUM(r.number) AS rank FROM products p INNER JOIN batch b ON b.prod_id = p.id INNER JOIN tasting t ON t.batch_id = b.id INNER JOIN rating r ON t.rate_id = r.id GROUP BY p.name ) rankedProducts ON rankedProducts.prodid = pn.prod_id WHERE n.name = ? ORDER BY rankedProducts.rank DESC;"
            
            var params = [];
            params.push(req.query["note"]);

            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"note":currentValue["note"], "pname":currentValue["pname"], "prank":currentValue["prank"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/getTastingsNotesRanked', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT n.name as nname, bm.name as bmname, SUM(r.number) as score FROM notes n INNER JOIN tastingnotes tn ON n.id = tn.note_id INNER JOIN tasting t on t.id = tn.taste_id INNER JOIN rating r on r.id = t.rate_id INNER JOIN brewmethod bm on bm.id = t.bm_id WHERE bm.name LIKE ? GROUP BY n.name ORDER BY score DESC;"
            
            var params = [];
            params.push(req.query["bmname"]);

            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");

                    res.json(result.map(function(currentValue, index, arr) {
                        return {"nname":currentValue["nname"], "bmname":currentValue["bmname"], "score":currentValue["score"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/getRLCount', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT rl.name AS rlname, COUNT(rl.name) AS count FROM roastlevel rl INNER JOIN products p ON p.rlevel_id = rl.id INNER JOIN batch b ON p.id = b.prod_id INNER JOIN tasting t ON t.batch_id = b.id INNER JOIN rating r ON r.id = t.rate_id WHERE r.number IN( SELECT DISTINCT NUMBER FROM ( SELECT NUMBER FROM rating ORDER BY NUMBER DESC LIMIT 3 ) AS top3 ) GROUP BY rl.name;"
            
            var params = [];
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(result.map(function(currentValue, index, arr) {
                        return {"rlname":currentValue["rlname"], "count":currentValue["count"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findSpendingPerRoaster', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT rname, SUM(spentOnProd) AS spent FROM ( SELECT COUNT(p.name) * p.price AS spentOnProd, r.name AS rname FROM products p INNER JOIN batch b ON p.id = b.prod_id INNER JOIN roaster r ON r.id = p.roaster_id GROUP BY p.name ) prodSpendings GROUP BY prodSpendings.rname ORDER BY spent DESC;"
            
            var params = [];
            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(result.map(function(currentValue, index, arr) {
                        return {"rname":currentValue["rname"], "spent":currentValue["spent"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findRoasterScore', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT r.name as rname, SUM(rt.number) AS score FROM roaster r INNER JOIN products p ON r.id = p.roaster_id INNER JOIN batch b ON b.prod_id = p.id INNER JOIN tasting t ON t.batch_id = b.id INNER JOIN rating rt ON rt.id = t.rate_id WHERE r.name LIKE ? GROUP BY r.name ORDER BY score DESC;"
            
            var params = [];
            params.push(req.query["rname"]);

            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(result.map(function(currentValue, index, arr) {
                        return {"rname":currentValue["rname"], "score":currentValue["score"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.get('/findRoastLevelExp', function (req, res) {
    var conn = mysql.createConnection(connInfo);
    
    conn.connect(function(err) {
        if (err) {
            res.status(500).json({"msg":err.sqlMessage})
        } else {
            
            var sql = "SELECT rl.name as rl, SUM(p.price) as exp FROM roastlevel rl INNER JOIN products p on rl.id = p.rlevel_id INNER JOIN batch b on b.prod_id = p.id WHERE rl.name LIKE ? GROUP BY rl.name ORDER BY exp;"
            
            var params = [];
            params.push(req.query["rl"]);

            conn.query(sql, params, function(err, result, fields) {
                if (err) {
                    res.status(500).json({"msg":err.sqlMessage})
                    console.log(err);
                } else {
                    // for local testing only
                    res.header("Access-Control-Allow-Origin", "*");
                    res.json(result.map(function(currentValue, index, arr) {
                        return {"rl":currentValue["rl"], "exp":currentValue["exp"]};
                    }))
                }
            });
            conn.end()
        }
    });
});

app.use(function (req, res, next) {
    res.status(404).json({"msg":"Route not found"})
});

app.listen(PORT, function () {
    console.log('Listening on port %s', PORT)
});
