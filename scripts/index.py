import pyreact
from clock import Clock


############################################
###   Top-level component

class App(pyreact.Component):
    def __init__(self, props):
        # very important to call super
        super().__init__(props)
        
        # state dictionary, just like in JS
        self.state = {
            'hour': 0,
            'minute': 0,
            'second': 0,
        }
        

    def render(self):
        # using self.element() factory function and returning a list as an example.
        # see clock.py for the more common self.jsx().
        return [
            'The current time is ',
            self.element(Clock, { 
                'hour': self.state.hour, 
                'minute': self.state.minute,
                'second': self.state.second,
                'key': 'clock',
            }),
            '.',
        ]


    # called after first render
    def componentDidMount(self):
        def ticktock():
            # create a JS Date object the transcrypt way
            d = __new__(Date())
            self.setState({
                'hour': d.getHours(),
                'minute': d.getMinutes(),
                'second': d.getSeconds(),
            })
        self.timer = window.setInterval(ticktock, 200);
    
    
    # caled before removal from page
    def componentWillUnmount(self):
        window.clearInterval(self.timer);
    
    
############################################
###   Main method that bootstraps React

def main():
    # using React.createElement directly
    ReactDOM.render(
        React.createElement(App, {}),
        document.getElementById('approot')
    );


# run main() when the document is ready
document.addEventListener("DOMContentLoaded", main)
