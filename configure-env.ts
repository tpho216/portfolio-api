/**
 * Copyright (c) TPho development. All rights reserved.
 *
 * Purpose: configure application environment. (e.g production or development)
 * Author: Peter Ho (Thien Phuc Ho)
 */
import fs = require('fs')

const copy = (from, to) => {
  try {
    fs.accessSync(from, fs.constants.R_OK);
    fs.accessSync(to, fs.constants.R_OK | fs.constants.W_OK);

    const fileContent = fs.readFileSync(from);
    fs.writeFileSync(to, fileContent);

  } catch (e) {
    console.log(e);
    throw e;
  }
};


const args = process.argv.slice(2);

if (args.length !== 1) {
  throw new Error("Error. Expected 2 parameters")
}

const destination = args[0];

if (destination !== 'production' && destination !== 'development') {
  throw new Error("Error. Expected 2 parameters")
}

const appEnv = `keys/.${destination}-key.env`;

copy(appEnv, '.env');
