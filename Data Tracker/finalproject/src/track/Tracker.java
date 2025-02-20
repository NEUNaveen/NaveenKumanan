package track;

import java.util.Date;
import java.util.Locale;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

/**
 * This class represents a tracker, it holds data points.
 * @author Naveen Kumanan
 */
public class Tracker {
	/**
	 * default constructor
	 */
	Tracker(){
		
	}
	
	// tracker name
	String name;
	// tracker values
	ArrayList<Double> values = new ArrayList<Double>();
	//tracker dates
	ArrayList<Date> dates = new ArrayList<Date>();
	
	/**
	 * Constructor for Tracker that sets the trackers name
	 * @param name name to set for the tracker
	 */
	Tracker(String name){
		this.name = name;
	}
	
	/**
	 * function adds a data point to the trackers collection of data points
	 * @param stringDate date of the data point to add
	 * @param value data points value
	 * @throws ParseException if stringDate is not in the correct format this exception will be thrown
	 */
	public void addDataPoint(String stringDate, String value) throws ParseException{
		values.add(Double.valueOf(value));
		
		//CITATION: copied and refactored from AI Overview of the google search result of "how to cast from string to Date java"
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date date = dateFormat.parse(stringDate);
            dates.add(date);
        } catch (ParseException e) {
            System.out.println("Invalid date format: " + e.getMessage());
            throw(e);
        }
	}
	

	/**
	 * function adds a data point to the trackers collection of data points from a file
	 * @param stringDate date of the data point to add
	 * @param value data points value
	 * @throws ParseException if stringDate is not in the correct format this exception will be thrown
	 */
	public void addDataPointFile(String stringDate, String value) throws ParseException{
		values.add(Double.valueOf(value));
		
		//CITATION: copied and refactored from AI Overview of the google search result of "how to cast from string to Date java"
		SimpleDateFormat dateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);

        try {
            Date date = dateFormat.parse(stringDate);
            dates.add(date);
        } catch (ParseException e) {
            System.out.println("Invalid date format: " + e.getMessage());
            throw(e);
        }
	}
	
	/**
	 * function deletes a data point from the trackers collection of data points.
	 * @param stringDate data of the data point to remove.
	 * @throws ParseException thrown if stringDate is in the wrong format.
	 */
	public void deleteDataPoint(String stringDate) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date date = dateFormat.parse(stringDate);
            int indexToRemove = dates.indexOf(date);
            
            values.remove(indexToRemove);
            dates.remove(indexToRemove);
            
        } catch (ParseException e) {
            System.out.println("Invalid date format: " + e.getMessage());
            throw(e);
        }
	}
	
	/**
	 * getter for the trackers collection of dates
	 * @return the trackers collection of dates
	 */
	public ArrayList<Date> getDates(){
		return this.dates;
	}
	
	/**
	 * getter for the trackers collection of values
	 * @return the trackers collection of values
	 */
	public ArrayList<Double> getValues(){
		return this.values;
	}
	
	/**
	 * setter for the trackers collection of dates
	 * @return the trackers collection of dates
	 */
	void setDates(ArrayList<Date> dates){
		this.dates = dates;;
	}
	
	/**
	 * setter for the trackers collection of values
	 * @return the trackers collection of values
	 */
	void setValues(ArrayList<Double> values){
		this.values = values;
	}
	
	/**
	 * convert the data to a string and return it
	 * @return dataStr our data as a String
	 */
	public String toString() {
		String dataStr = this.name + "\n";
		
		//store the length or the arrays in the file.
		dataStr += this.values.size() + "\n";
		
		for(int i =0; i < this.values.size(); i++) {
			dataStr += this.values.get(i).toString() + "\n";
			dataStr += this.dates.get(i).toString() + "\n";
		}
		
		return dataStr;
	}
}
