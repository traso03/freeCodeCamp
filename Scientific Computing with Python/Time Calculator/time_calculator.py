import datetime

# Not good code, but at least I didn't copy it. I couldn't do better.

def add_time(start, duration, week_day=None):
  start_hours, start_mins = start.split(":")
  start_mins, period = start_mins.split(" ")
  hours_to_add, mins_to_add = duration.split(":")

  correct_hours = 0
  if (period == "AM"):
    correct_hours = int(start_hours)
  elif (period == "PM"):
    correct_hours = int(start_hours) + 12
    
  today_date = datetime.datetime.now().replace(hour=int(correct_hours), minute=int(start_mins))
  
  time_change = datetime.timedelta(hours=int(hours_to_add), minutes=int(mins_to_add))
  updated_date = today_date + time_change

  days_of_difference = updated_date.day - today_date.day

  string_days = ""
  if days_of_difference == 1:
    string_days = " (next day)"
  elif days_of_difference > 1:
    string_days = " (" + str(days_of_difference) + " days later)"
  
  if week_day is not None:
    if week_day:
      week = ('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')
      new_day = f', {week[(week.index(week_day.capitalize()) + days_of_difference) % 7]}' 
    new_time = updated_date.strftime("%I:%M %p") + new_day + string_days
  else:
    new_time = updated_date.strftime("%I:%M %p") + string_days
  
  if(new_time[0] == '0'):
    new_time = new_time[1::]
    
  return new_time