package track;

import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

import org.knowm.xchart.SwingWrapper;
import org.knowm.xchart.XYChart;
import org.knowm.xchart.XYChartBuilder;


/**
 * The view class is responsible for displaying things to the user and taking in user input and passing
 * information from the user input to the control class.
 * @author Naveen Kumanan
 */
public class View {
	/**
	 * default constructor
	 */
	View(){
		
	}
	
	/**
	 * This function will display a menu and return the user's answer.
	 * @return user input
	 */
	public ArrayList<String> printMenu() {
		Scanner scanner = new Scanner(System.in);
		ArrayList<String> userAns = new ArrayList<String>();
		
		System.out.print("Choose an option:\n"
				+ "(a) add a tracker \n"
				+ "(b) delete a tracker \n"
				+ "(c) add a data point \n"
				+ "(d) delete a data point \n"
				+ "(e) view analysis \n"
				+ "(f) exit \n"
				+ "(g) load data from a file \n"
				+ "(h) save data to a file \n"
				+ "(i) print available trackers \n");
		
		// option chosen added in 0 index. additional info will be added after.
		userAns.add(scanner.nextLine());
		
		switch(userAns.get(0)) {
			case "a":
				System.out.print("What do you want to call the tracker \n");
				userAns.add(scanner.nextLine());
				break;
				
			case "b":
				System.out.print("What is the name of the tracker you want to delete? \n");
				userAns.add(scanner.nextLine());
				break;
				
			case "c":
				System.out.print("Which tracker do you want to add the data point for? \n");
				userAns.add(scanner.nextLine());
				
				System.out.print("Enter the date of the data point in the \"yyyy-MM-dd\" format: \n");
				userAns.add(scanner.nextLine());
				
				System.out.print("Enter the value of the data point: \n");
				userAns.add(scanner.nextLine());
				break;
				
			case "d":
				System.out.print("Which tracker do you want to delete a data point for? \n");
				userAns.add(scanner.nextLine());
				
				System.out.print("Which date? (Enter the date of the data point in the \"yyyy-MM-dd\" format) \n");
				userAns.add(scanner.nextLine());
				break;
				
			case "e":
				System.out.print("Which tracker do you want to view analysis for? \n");
				userAns.add(scanner.nextLine());
				break;
			case "f":
				System.out.print("Thanks for using Track, feel free to come back anytime! \n");
				System.exit(0);
				break;
			case "g":
				System.out.print("What is the file's name? \n");
				userAns.add(scanner.nextLine());
				break;
			case "h":
				System.out.print("file name? \n");
				userAns.add(scanner.nextLine());
				break;
			case "i":
				break;
		}
		
		return userAns;
	}
	
	/**
	 * This function will display a graph using the Xchart library.
	 * I am using the Xchart library for displaying graphs. The Xchart library is a part of this project and is under
	 * referenced libraries. Lot of the code in this function is copy pasted and refactored from the Xchart readme file that
	 * comes when you download the Xchart library from their website at https://knowm.org/open-source/xchart/
	 * @param xData a collection of all the dates from the datapoints
	 * @param yData a collection of value to plot against the dates
	 */
	public void displayGraph(ArrayList<Date> xData,  ArrayList<Double> yData, String tracker) {		
		// Create Chart
        XYChart chart = new XYChartBuilder().width(800).height(600).title(tracker + " against Date").xAxisTitle("Date").yAxisTitle(tracker).build();

        // Add series
        chart.addSeries(tracker, xData, yData);

        // Show chart
        new SwingWrapper<>(chart).displayChart();

	}
}
