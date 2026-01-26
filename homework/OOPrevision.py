#Attempts to group informatio, data and functionality into objects and classes.
#With OOP, we can create objects that represent real-world entities and define their properties and behaviors.
#Each object is responsible for its own data and operations that is made from a class, promoting encapsulation and modularity.
#Lightbulb example:
# Wattage, colour, type of bulb, connection type.
#    these can be seperated into classes
#       Name of class
#       Attributes/properties
#       Methods/functions
#   Can think of a class as a 'blueprint' for creating objects.
#essentially a template
#       Once a class is defined, it is very easy to reuse that class to create many objects.
#   Creating a new copy (through 'new') is called instantiation:
#       The process of creating an object from the class template.
#           The inidivual attribute of any object can be unique
#
#Example of OOP for toyTank

class toyTank:
    def __init__(self, colour, size, ammo):
        self.colour = colour
        self.size = size
        self.ammo = ammo

    def getColour(self):
        print("the tank colour is " + self.colour)

    def getSize(self):
        print("the tank size is " + self.size)
    
    def getAmmo(self):
        print("the tank ammo is " + self.ammo)

tankOne = toyTank("Green", "Small", "10")
tankTwo = toyTank("Blue", "Medium", "15")
tankThree = toyTank("Red", "Large", "5")

tankOne.getSize()
tankTwo.getColour()
tankThree.getAmmo()
