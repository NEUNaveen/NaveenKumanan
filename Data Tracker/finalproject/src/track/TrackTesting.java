/**
 * 
 */
package track;

import static org.junit.jupiter.api.Assertions.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.junit.jupiter.api.Test;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

/**
 * Testing Class that tests all of the program
 * @author Naveen Kumanan
 */
class TrackTesting {

	/**
	 * Testing function for the Model classe's functionality
	 * @throws ParseException this exception is a part of models functionality
	 */
	@Test
	void testModel() throws ParseException {
		Model model = new Model();
		
		// to test if createTracker and deleteTracker work correctly I manually create HashMap<String, Tracker>, manually add and remove
		// items to see if the sizes of model.trackers and the manually created hashmap are the same.
		model.createTracker("something");
		HashMap<String, Tracker> expectedTrackers = new HashMap<String, Tracker>();
		expectedTrackers.put("something", new Tracker("something"));
		assertEquals(expectedTrackers.size(), model.trackers.size(), "Trackers are not the same size");
		
		model.deleteTracker("something");
		expectedTrackers.remove("something");
		assertEquals(expectedTrackers.size(), model.trackers.size(), "Trackers are not the same size");
		
		model.createTracker("weight");
		model.addDatapoint("weight", "2024-10-10", "106.25");
		model.addDatapoint("weight", "2024-10-15", "105.25");
		model.addDatapoint("weight", "2024-10-20", "104.5");
		
		Tracker expectedTracker = new Tracker("weight");
		expectedTracker.values.add(106.25);
		expectedTracker.values.add(105.25);
		expectedTracker.values.add(104.5);
		
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date1 = dateFormat.parse("2024-10-10");
            expectedTracker.dates.add(date1);
            
            Date date2 = dateFormat.parse("2024-10-15");
            expectedTracker.dates.add(date2);
            
            Date date3 = dateFormat.parse("2024-10-20");
            expectedTracker.dates.add(date3);
        } // I added the below line because you have to put the dateFormat.parse function in a try catch block but since I want the data points
          // to get added here I never want to enter the catch block, therefore I don't have coverage for this part of the code.
        catch (ParseException e) {
            System.out.println("Invalid date format: " + e.getMessage());
        }
       assertEquals(expectedTracker.dates.size(), model.getTrackerDates("weight").size());
       assertEquals(expectedTracker.values.size(), model.getTrackerValues("weight").size());
       
       //testing model.toString()
       assertEquals("weight\n"
       		+ "3\n"
       		+ "106.25\n"
       		+ "Thu Oct 10 00:00:00 EDT 2024\n"
       		+ "105.25\n"
       		+ "Tue Oct 15 00:00:00 EDT 2024\n"
       		+ "104.5\n"
       		+ "Sun Oct 20 00:00:00 EDT 2024\n", model.toString());
       
       // testing model.deleteDatapoint
       model.deleteDatapoint("weight", "2024-10-10");
       expectedTracker.dates.remove(0);
       expectedTracker.values.remove(0);
       assertEquals(expectedTracker.dates.size(), model.getTrackerDates("weight").size());
       assertEquals(expectedTracker.values.size(), model.getTrackerValues("weight").size());
       
       //testing the catch blocks in Tracker and Model, so trying to add and delete data point with bad input format. Should be yyyy-mm-dd, anything else is wrong.
       assertThrows(ParseException.class, ()->model.addDatapoint("weight", "10102024", "106.25"));
       
       assertThrows(ParseException.class, ()->model.deleteDatapoint("weight", "10102024"));       
       
       assertThrows(NullPointerException.class, ()->model.addDatapoint("NoneExistantTracker", "2024-10-11", "106.25"));       

	}
	
	/**
	 * testing function for the View classe's printMenu function.
	 */
	@Test
	void testViewPrintMenu() {
		View view = new View();
		
		//testing option a
		String input = "a\nweight\n";
        InputStream in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		ArrayList<String> userInput = view.printMenu();
		ArrayList<String> expected = new ArrayList<String>();
		expected.add("a");
		expected.add("weight");
		
		assertEquals(expected, userInput);
		
		//testing option b
		input = "b\nweight\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("b");
		expected.add("weight");

		assertEquals(expected, userInput);
		
		//testing option c
		input = "c\nweight\n2024-10-18\n11";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("c");
		expected.add("weight");
		expected.add("2024-10-18");
		expected.add("11");
		
		assertEquals(expected, userInput);
		
		//testing option d
		input = "d\nweight\n2024-10-18\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("d");
		expected.add("weight");
		expected.add("2024-10-18");
		
		assertEquals(expected, userInput);
		
		//testing option e
		input = "e\nweight\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("e");
		expected.add("weight");

		assertEquals(expected, userInput);
		
		//I am not testing option f because it calls System.exit(0) so the below graph that we want to view will not persist.
		
		//testing option g
		input = "g\ndata1128\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("g");
		expected.add("data1128");

		assertEquals(expected, userInput);
		
		//testing option h
		input = "h\ndata1128\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("h");
		expected.add("data1128");

		assertEquals(expected, userInput);
		
		//testing option i
		input = "i\n";
        in = new ByteArrayInputStream(input.getBytes());
        System.setIn(in);

		userInput = view.printMenu();
		expected = new ArrayList<String>();
		expected.add("i");

		assertEquals(expected, userInput);
	}
	
	/**
	 * Testing function for the View classe's displayGraph function
	 */
	@Test
	void testViewDisplayGraph() {
		View view = new View();
		
		//testing displaygraph
		ArrayList<Date> xData = new ArrayList<Date>();
		xData.add(new Date());
		xData.add(new Date());
		xData.add(new Date());

		ArrayList<Double> yData = new ArrayList<Double>();
		yData.add(1.0);
		yData.add(10.0);
		yData.add(10.0);

		// if the graph that displays has the same points as displayed above we can say that displayGraph is working.
		// there is no assert for a graph so this is the best way I could think of testing the graph.
		view.displayGraph(xData, yData, "test");
		
		// the graph is not persisting so we can't view the graph.
	}
	
	/**
	 * testing function for the Control classe's functionality
	 */
	@Test
	void testControl() {
		// I dont see a way to test control right now, as it just calls functions that are tested above.
		// and the file loading or saving I couldnt figure out a test since it does not return anything so 
		// I dont have anything to assert.
		}
}
