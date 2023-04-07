import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv("epa-sea-level.csv")
    
    # Create scatter plot
    plt.scatter(df["Year"], df["CSIRO Adjusted Sea Level"])

    # Create first line of best fit
    firstLine = linregress(df["Year"], df["CSIRO Adjusted Sea Level"])
    x_pred1 = pd.Series([i for i in range(1880, 2051)])
    y_pred1 = firstLine.slope*x_pred1 + firstLine.intercept
    plt.plot(
      x_pred1,
      y_pred1,
      "red"
    )

    # Create second line of best fit
    newData = df.loc[df["Year"] >= 2000]
    secondLine = linregress(newData["Year"], newData["CSIRO Adjusted Sea Level"])
    x_pred2 = pd.Series([i for i in range(2000, 2051)])
    y_pred2 = secondLine.slope*x_pred2 + secondLine.intercept
    plt.plot(
      x_pred2,
      y_pred2,
      "green"
    )

    # Add labels and title
    plt.xlabel("Year")
    plt.ylabel("Sea Level (inches)")
    plt.title("Rise in Sea Level")
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()