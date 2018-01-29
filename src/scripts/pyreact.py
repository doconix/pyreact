##
##  Author: Conan Albrecht <doconix@gmail.com>
##  License: Apache 2.0 Open Source
##  November, 2017
##
__pragma__('kwargs')
import re


###################################################
###   React Components
        
# this is a bit of a hack, and I'm happy to have someone do it a better way.
# when pyreact.Component classes are created, we register a reference here.
# this allows us to put components into the context so the JSX compiler can
# find them.  Otherwise the comverter would not be able to resolve names like
# <MyCustomComponent />.
registered_components = {}        
        
class ComponentMeta(type):        
    def __new__ (meta, name, bases, attribs):
        cls = type.__new__ (meta, name, bases, attribs)
        registered_components[name] = cls
        # override the default name='cls' property to make error messages and debugging more meaningful
        # if transcrypt makes this change, we can take this part out
        descrip = Object.getOwnPropertyDescriptor(cls, 'name');
        descrip.value = name
        Object.defineProperty(cls, 'name', descrip);
        return cls
        
        
class AbstractComponent(object, metaclass=ComponentMeta):
    '''Superclass for React Components.  Use Component or PureComponent below.'''
    def __init__(self, props):
        object.__init__(self)
        
        
    def render(self):
        return 'Subclass should override render()'
    

    def element(self, elem, props, *children):
        '''Creates React elements using Component class and properties dictionary'''
        return React.createElement(elem, props, *children)
        
        
class Component(AbstractComponent, React.Component.prototype):
    '''Superclass for React Components.  PyReact version of React.Component'''
    def __init__(self, props):
        AbstractComponent.__init__(self)
        React.Component.apply(self, [ props ])
        
        
class PureComponent(AbstractComponent, React.PureComponent.prototype):
    '''Superclass for React Components.  PyReact version of React.PureComponent'''
    def __init__(self, props):
        AbstractComponent.__init__(self)
        React.PureComponent.apply(self, [ props ])
        
        
    