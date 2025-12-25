max_size = 5  
stack = []    

def push(item):
    if len(stack) == max_size:
        print("The stack is full.")
    else:
        stack.append(item)
        print(item, "pushed to stack.")

def pop():
    if len(stack) == 0:
        print("The stack is empty.")
    else:
        item = stack.pop()
        print(item, "popped from stack.")


while True:
    choice = int(input("""
Choose an operation:
1. Push
2. Pop
3. Display Stack
4. Exit
:"""))
    if choice == 1:
        item = int(input("Enter item to push: "))
        push(item)
    elif choice == 2:
        pop()
    elif choice == 3:
        print("Current stack: ", stack)
    elif choice == 4:
        break
    else:
        print("Invalid choice, please try again.") 