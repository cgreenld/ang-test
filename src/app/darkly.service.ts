import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { initialize, LDClient, LDFlagSet } from 'launchdarkly-js-client-sdk';

// set up a user to pass 

@Injectable({
  providedIn: 'root'
})
export class DarklyService {
  ldClient: LDClient;
  flags: LDFlagSet;
  flagChange:Subject<Object> = new Subject<Object>();

  constructor() {
    this.flags = {'toh-modify': false, 'toh-search': false};

    // edit here to add the key
    this.ldClient = initialize("61faede4102b18146a95fddc",
      { key: "connortest", 
        anonymous: false 
      }
    );

    this.ldClient.on('change', (flags) => {
      if(flags['toh-modify'] !== undefined) {
        this.flags['toh-modify'] = flags['toh-modify'];
      }
      if(flags['toh-search'] !== undefined) {
        this.flags['toh-search'] = flags['toh-search'];
      }
      this.flagChange.next(this.flags);
      console.log("Flags updated.")
   });

   this.ldClient.on('ready', () => {
     this.setFlags();
   })
  }

  changeUser(user: string) {
    if(user !== "Anonymous") {
      this.ldClient.identify({key: user, name: user, anonymous: false});
    }
    else {
      this.ldClient.identify({key: 'anon', anonymous: true});
    }
  }
  setFlags() {
    this.flags = this.ldClient.allFlags();
    console.log("Flags initialized.");
  }
}

