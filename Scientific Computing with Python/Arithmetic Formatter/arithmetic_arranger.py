def arithmetic_arranger(problems, show_result = False):
  if (len(problems) > 5):
    return "Error: Too many problems."

  ops = {
    '+': lambda pair: str(pair[0] + pair[1]),
    '-': lambda pair: str(pair[0] - pair[1]),
  }
  arranged_problems = []
  top = []
  bottom = []
  lines = []
  results = []
  for problem in problems:
    problem_array = problem.split()
    operand1 = problem_array[0]
    operator = problem_array[1]
    operand2 = problem_array[2]
    max_len = len(max(problem_array, key=len))
    
    if (operator == '/' or operator == '*'):
      return "Error: Operator must be '+' or '-'."

    if (not operand1.isdigit() or not operand2.isdigit()):
      return "Error: Numbers must only contain digits."

    if(max_len > 4):
      return "Error: Numbers cannot be more than four digits."

    line_len = max_len + 2
    line = '-' * line_len  # 2 corresponds to the sign and space
    first_num = operand1.rjust(line_len, ' ')
    second_num = f"{operator}{' ' * (line_len - len(operand2) - 1)}{operand2}"
    
    top.append(first_num)
    bottom.append(second_num)
    lines.append(line)

    if show_result:
      res = ops[operator]([int(i) for i in problem_array[::2]])
      results.append(f"{res.rjust(line_len, ' ')}")

  arranged_problems = '\n'.join(['    '.join(i)
                                   for i in (top, bottom, lines)])

  if results:
    arranged_problems += '\n' + '    '.join(results)
  return arranged_problems