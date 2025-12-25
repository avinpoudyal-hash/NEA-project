queue = [0,0,0,0,0]
max_size = 5
front = 0
rear = 0
choice = 0
item = 0
def enqueue(queue, rear):
    if rear == max_size:
        print("Queue is full")
        return
    else:
        item = int(input("Enter item to enqueue: "))
        queue[rear] = item
        print("New queue after enqueue: ", queue)
        rear += 1
        return rear

def dequeue(queue, front, rear, item, max_size):
    if front == 0 and rear == 0:
        print("Empty queue")
        return
    elif front == max_size and rear == max_size:
        print("Queue is empty")
        return
    else:
        queue[front] = 0
        print("Dequeued item: ", item)
        print("new queue after dequeue: ", queue)
        front += 1
        return front


while True:
    choice = int(input("""
Choose an operation:
1. Enqueue
2. Dequeue
3. Display Queue
4. Exit
5. Rear pointer position
6. Front pointer position
:"""))
    if choice == 1:
        rear = enqueue(queue, rear)
    elif choice == 2:
        front = dequeue(queue, front, rear, item)
    elif choice == 3:
        print("Current queue: ", queue)
    elif choice == 4:
        break
    elif choice == 5:
        print("Rear pointer position: ", rear)
    elif choice == 6:
        print("Front pointer position: ", front)
    else:
        print("Invalid choice, please try again.")
