class Category:
  def __init__(self, description):
    self.description = description
    self.ledger = []
    self.__balance = 0.0

  def __repr__(self):
    header = self.description.center(30, "*") + "\n"
    body = ""
    for item in self.ledger:
      desc = "{:<23}".format(item["description"])
      amt = "{:>7.2f}".format(item["amount"])
      body += "{}{}\n".format(desc[:23], amt[:7])
    footer = "Total: {:.2f}".format(round(self.__balance, 2))
    return header + body + footer
  
  def deposit(self, amount, description=""):
    self.ledger.append({"amount": amount, "description": description})
    self.__balance += amount

  def withdraw(self, amount, description=""):
    if self.check_funds(amount):
      self.ledger.append({"amount": -1 * amount, "description": description})
      self.__balance -= amount
      return True
    else:
      return False

  def get_balance(self):
    return self.__balance

  def transfer(self, amount, category):
    if self.check_funds(amount):
      self.withdraw(amount, "Transfer to {}".format(category.description))
      category.deposit(amount, "Transfer from {}".format(self.description))
      return True
    else:
      return False

  def check_funds(self, amount):
    if amount > self.__balance:
      return False
    else:
      return True


def create_spend_chart(categories):
  spent_amounts = []
  for category in categories:
    spent = 0
    for item in category.ledger:
        if item["amount"] < 0:
            spent += abs(item["amount"])
    spent_amounts.append(round(spent, 2))

  total = round(sum(spent_amounts), 2)
  spent_percentage = list(map(lambda amount: int((((amount / total) * 10) // 1) * 10), spent_amounts))

  header = "Percentage spent by category\n"

  chart = ""
  for value in reversed(range(0, 101, 10)):
    chart += str(value).rjust(3) + '|'
    for percent in spent_percentage:
        if percent >= value:
            chart += " o "
        else:
            chart += "   "
    chart += " \n"

  footer = "    " + "-" * ((3 * len(categories)) + 1) + "\n"
  descriptions = list(map(lambda category: category.description, categories))
  max_length = max(map(lambda description: len(description), descriptions))
  descriptions = list(map(lambda description: description.ljust(max_length), descriptions))
  for x in zip(*descriptions):
    footer += "    " + "".join(map(lambda s: s.center(3), x)) + " \n"

  return (header + chart + footer).rstrip("\n")