import numpy as np

def calculate(list):
  if len(list) < 9:
    raise ValueError("List must contain nine numbers.");
  
  array = np.array(list);
  matrix = array.reshape((3, 3))
  
  mean = np.mean(matrix);
  meanx = np.mean(matrix, axis = 0).tolist();
  meany = np.mean(matrix, axis = 1).tolist();

  var = np.var(matrix);
  varx = np.var(matrix, axis = 0).tolist();
  vary = np.var(matrix, axis = 1).tolist();
  
  std = np.std(matrix);
  stdx = np.std(matrix, axis = 0).tolist();
  stdy = np.std(matrix, axis = 1).tolist();
  
  max = np.max(matrix);
  maxx = np.max(matrix, axis = 0).tolist();
  maxy = np.max(matrix, axis = 1).tolist();
  
  min = np.min(matrix);
  minx = np.min(matrix, axis = 0).tolist();
  miny = np.min(matrix, axis = 1).tolist();
  
  sum = np.sum(matrix);
  sumx = np.sum(matrix, axis = 0).tolist();
  sumy = np.sum(matrix, axis = 1).tolist();
  
  calculations = {
    'mean': [meanx, meany, mean],
    'variance': [varx, vary, var],
    'standard deviation': [stdx, stdy, std],
    'max': [maxx, maxy, max],
    'min': [minx, miny, min],
    'sum': [sumx, sumy, sum]
  }
  
  return calculations