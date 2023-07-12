## High level behaviour: Form data should persist between page loads

* be able to change from timing based autosave to content based (gdocs)
* use localStorage so less requests
* don't autosave when no new data has been entered to avoid unecassary requests
* Be able to only send diff from last save (server constructs current state from diffs and original)

* make sure last data entered before tab is closed gets saved
  * warn user if not saved

* data validation can be done on submit and not on save


## Time based autosave
* Naive approach
  * on first form interaction, trigger setinterval that sends data every 5 seconds

* saving to localStoage and server
  * on saveForm, start by saving to server, and once confirmed save to localStorage
  * When restoring state, first try from local storage (You'll have a programatic garuntee that it is the same as what's on the server)
  * then try restoring from server
  * If nothing in either of those places, there is no saved form data

## Using Debounce
* when form field changed, trigger a timer
* if no further changes happen within time, send update to DB
* if new change within timer, set timer again