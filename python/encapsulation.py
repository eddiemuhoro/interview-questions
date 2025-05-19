class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner        # Public attribute
        self.__balance = balance  # Private attribute (name mangling)

    # Public method to view balance
    def get_balance(self):
        return self.__balance

    # Public method to deposit money
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited ${amount}. New balance is ${self.__balance}.")
        else:
            print("Deposit amount must be positive.")

    # Public method to withdraw money
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrew ${amount}. New balance is ${self.__balance}.")
        else:
            print("Invalid withdrawal amount.")

# Create account instance
account = BankAccount("Alice", 1000)

# Accessing public method
account.deposit(500)
account.withdraw(200)
print("Current balance:", account.get_balance())

# Trying to access private attribute directly (not recommended)
# print(account.__balance)  # AttributeError

# Accessing private attribute via name mangling (discouraged but possible)
print("Access via name mangling:", account._BankAccount__balance)
