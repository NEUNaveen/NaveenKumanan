package track;

import java.util.Date;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * The model class essentially contains all the data in the program. This model class also goes a little further
 * to manage retrieval, creation and deletion of data in the program.
 * @author Naveen Kumanan
 */
public class Model {
	/**
	 * default constructor
	 */
	Model(){
		
	}
	HashMap<String, Tracker> trackers = new HashMap<String, Tracker>();
	
	/**
	 * Function creates a new tracker object and adds it to this.trackers
	 * @param name tracker's name
	 */
	public void createTracker(String name) {
		this.trackers.put(name, new Tracker(name));
		
	}
	
	/**
	 * removes a specified tracker object from this.trackers.
	 * @param name specified tracker's name
	 */
	public void deleteTracker(String name) {
		this.trackers.remove(name);
		
	}
	
	/**
	 * function adds a specified data point to a specified tracker
	 * @param trackerName specified tracker's name
	 * @param date date of the data point
	 * @param value value of the data point
	 * @throws ParseException thrown if the date string is not in the correct format
	 */
	public void addDatapoint(String trackerName, String date, String value) throws ParseException {
		Tracker ourTracker = this.trackers.get(trackerName);
		try {
			ourTracker.addDataPoint(date, value);
		} catch(NullPointerException e) {
			System.out.print("Create this tracker using option a from the menu before adding data points to it!\n");
			throw(e);
		}
		
	}
	
	/**
	 * function adds a specified data point to a specified tracker from a file
	 * @param trackerName specified tracker's name
	 * @param date date of the data point
	 * @param value value of the data point
	 * @throws ParseException thrown if the date string is not in the correct format
	 */
	public void addDatapointFile(String trackerName, String date, String value) throws ParseException {
		Tracker ourTracker = this.trackers.get(trackerName);
		ourTracker.addDataPointFile(date, value);
	}
	
	/**
	 * deletes a specified data point from a specified tracker.
	 * @param trackerName specified tracker's name
	 * @param date date of the data point to delete
	 * @throws ParseException thrown if date param is in the wrong format
	 */
	public void deleteDatapoint(String trackerName, String date) throws ParseException {
		Tracker ourTracker = this.trackers.get(trackerName);
		ourTracker.deleteDataPoint(date);
	}
	
	/**
	 * function returns a specified trackers collection of dates
	 * @param trackerName specified tracker's name
	 * @return collection of dates
	 */
	public ArrayList<Date> getTrackerDates(String trackerName){
		Tracker ourTracker = this.trackers.get(trackerName);
		return ourTracker.getDates();
	}
	/**
	 * function returns a specified trackers collection of values
	 * @param trackerName specified tracker's name
	 * @return collection of values
	 */
	public ArrayList<Double> getTrackerValues(String trackerName){
		Tracker ourTracker = this.trackers.get(trackerName);
		return ourTracker.getValues();
	}
	
	/**
	 * convert and return our data as a String
	 * @return dataStr our data as a String
	 */
	public String toString() {
		String dataStr = "";
		
		for(Tracker tracker: this.trackers.values()) {
			dataStr += tracker.toString();
		}
		
		return dataStr;
	}
}
