import pyreact
import random


# Note that using a string for JSX is not optimal - the next step is to have
# Transcrypt to convert the jsx at transpile time, probably through some type 
# of plugin mechanism.

def randcolor():
    return '#{}'.format(''.join([ random.choice('0123456789abcdef') for i in range(6) ]))


############################################
###  A digital clock

class Clock(pyreact.Component):
    def __init__(self, props):
        # very important to call super
        super().__init__(props)
        
        # state dictionary, just like in JS
        self.state = {
            'randcolor': randcolor(),
        }
    
    
    def render(self):
        # when using .jsx, pyreact places `self` and all Component classes in scope automatically
        # extra variables, like `color` below, go in the context dictionary or as keyword args.
        # (yes, I realize {self.state.randcolor} could have been in the jsx - just doing an example :)
        return self.jsx('''
            <button className="clock" style={style} onClick={self.on_click}>
                <ClockNumber key="hour" value={self.props.hour} />
                :
                <ClockNumber key="minute" value={self.props.minute} />
                :
                <ClockNumber key="second" value={self.props.second} />
            </button>
        ''', 
            # as a keyword arg:
            style={ 'color': self.state.randcolor }
        )
        
        
    def on_click(self, evt):
        self.setState({
            'randcolor': randcolor(),
        })



##############################################
###  A number on a clock

class ClockNumber(pyreact.Component):
    # no need for __init__ because not using .state

    def render(self):
        # example of returning a string directly
        # transcrypt does .format(), but only at a basic level
        # so using the JS .padStart() instead
        return str(self.props.value).padStart(2, '0')

