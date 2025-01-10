package track;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

/**
 * The control class manages calling methods of the view and model classes. It gets user input information
 * from the view class and passes some of it to the model class by calling its methods.
 * @author Naveen Kumanan
 */
public class Control {
	//controls view instance
	View view = new View();
	//controls model instance
	Model model = new Model();
	
	/**
	 * default constructor
	 */
	Control(){
		
	}
	/**
	 * the run methods contains essentially the entire programs functionality. The run method is called by main
	 * and is how the entire program starts running and once run is done the entire program is also done.
	 * @throws ParseException exception thrown by the Model class.
	 */
	public void run() throws ParseException {
		boolean notDone = true;
		
		while(notDone) {
				//userAns[0] has the option the user chose and subsequent indices will have appropriate additional information for the chosen option.
			ArrayList<String> userAns = this.view.printMenu();
			
			switch(userAns.get(0)) {
			case "a":
				this.model.createTracker(userAns.get(1));
				break;
			
			case "b":
				this.model.deleteTracker(userAns.get(1));
				break;
				
			case "c":
				// 0 index has option, 1 has tracker name, 2 has the date of the dp, 3 has the value of the dp all as a String.
				this.model.addDatapoint(userAns.get(1), userAns.get(2), userAns.get(3));
				break;
			case "d":
				// 0 index has option, 1 has tracker name, 2 has the date of the dp.
				this.model.deleteDatapoint(userAns.get(1), userAns.get(2));
				break;
				
			case "e":
				try {
					ArrayList<Date> xData = this.model.getTrackerDates(userAns.get(1));
					ArrayList<Double> yData = this.model.getTrackerValues(userAns.get(1));
					
					this.view.displayGraph(xData, yData, userAns.get(1));
					break;
				}
				catch(NullPointerException e){
					System.out.print("There is no tracker with that name.\n");
					
				}
				break;
				
			case "g":
				// load data from a file
				try {
		            File file = new File(userAns.get(1));
		            Scanner scanner = new Scanner(file);
		            while (scanner.hasNextLine()) {
		            	//get a trackers name and create it in model.
		            	String trackerName = scanner.nextLine();
		            	this.model.createTracker(trackerName);
		            	
		            	//get the size of the date and value array using the next scanner.nextLine() call
		            	int arraySize = Integer.parseInt(scanner.nextLine());
		            	
		            	// iterate that many times to add that many data points to our tracker.
		            	for(int i=0; i < arraySize ; i++) {
		            		String val = scanner.nextLine();
		            		String date = scanner.nextLine();
		            		this.model.addDatapointFile(trackerName, date, val);
		            	}
		            }
		            scanner.close();
			        System.out.println("Successfully loaded in data from " + file.getName() + "\n");

		        } catch (FileNotFoundException e) {
		            System.out.println("An error occurred.");
		            e.printStackTrace();
		        }
				break;
				
			case "h":
				// CITATION: https://www.w3schools.com/java/java_files_create.asp
				// save data to a file
				/*
				 * create the file
				 */
				try {
				      File myObj = new File(userAns.get(1));
				      if (myObj.createNewFile()) {
				        System.out.println("File created: " + myObj.getName());
				      } else {
				        System.out.println("File already exists.");
				      }
				      
				      /*
				       * write to the file
				       */
				      try {
				          FileWriter myWriter = new FileWriter(userAns.get(1));
				          myWriter.write(this.model.toString());
				          myWriter.close();
				          System.out.println("Successfully wrote to the file.");
				        } catch (IOException e) {
				          System.out.println("An error occurred.");
				          e.printStackTrace();
				        }
				      
				    } catch (IOException e) {
				      System.out.println("An error occurred.");
				      e.printStackTrace();
				    }
				break;
			case "i":
				System.out.print(this.model.toString());
				
			}
		}
	}
}
