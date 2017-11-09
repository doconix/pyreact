##
##  Author: Conan Albrecht <doconix@gmail.com>
##  License: Apache Open Source
##  November, 2017
##
__pragma__('kwargs')
import re

# match our version number against main.js
__pyreact_version__ = '1.0.0'
if not window['PyReact']:
    console.warn('The PyReact JS object is not available. Have you loaded the <script> element for pyreact-bundle.js?')
elif window['PyReact'].__pyreact_version__ != __pyreact_version__:
    console.warn('Version mismatch in PyReact: pyreact-bundle.js is {} while pyreact.py is {}'.format(
        window['PyReact'].__pyreact_version__,
        __pyreact_version__,
    ))


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
        
        
    def jsx(self, jsx_st, context=None, **kw_context):
        '''
        Creates React elements using JSX strings.  "self" and all
        Component classes are automatically placed in the context.
        Any additional {variables} referenced in the jsx should be
        sent in the context dictionary.
        
        Note that any logic in the jsx must be done in JS right now because
        Transcrypt doesn't transpile strings in the source code.  For example,
        use the JS ternary operator for ifs, not the Python one.
        '''
        # this is not optimal because we're converting the JSX string every time
        # render is called. Normal react transpiles to normal JS at build time.
        # it's still enough fast and scales fine (since client browsers do this),
        # but we should somehow plug it into transcrypt transpiler.
        jsx_context = {}
        jsx_context.update(registered_components)
        jsx_context['self'] = self
        if context is not None:
            jsx_context.update(context)
        if len(kw_context) > 0:
            jsx_context.update(kw_context)
        try:
            return PyReact.jsx(jsx_st, jsx_context)
        except ReferenceError as e:
            msg = 'jsx references an unknown context name: {}'.format(e.message)
            console.error(msg, e)
            return msg
        
        
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
        
        
    