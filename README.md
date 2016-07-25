# React Material

## Components

### Tab

#### Introduction

The component **Tab** has 2 labels: `<Tab>` and `<TabPanel>`. The latter ones should be wrapped in the former one.

#### Usage

Import the component(The filepath might be different in your environment):
```JS
import {Tab, TabPanel} from '../../components/Tab';
```
and use the component like this:
```HTML
<Tab>
    <TabPanel name="Tab 1">
        <div>Panel 1</div>
    </TabPanel>
    <TabPanel name="Tab 2">
        <div>Panel 1</div>
    </TabPanel>
    <TabPanel name="Tab 3">
        <div>Panel 1</div>
    </TabPanel>
</Tab>
```
The component **Tab** will automatically generate `<TabSelector>` for selecting, and `name` attributes in `<TabPanel>` will be set as the content of the `<TabSelector>`.

### Collapsable

#### Introduction

The component **Collapsable** has 2 labels: `<Collapsable>` and `<CollapsablePanel>`. The latter ones should be wrapped in the former one.

#### Usage

Import the component(The filepath might be different in your environment):
```JS
import {Collapsable, CollapsablePanel} from '../../components/Collapsable';
```
and use the component like this:
```HTML
<Collapsable>
    <CollapsablePanel>
        <div>Panel 1</div>
    </CollapsablePanel>
    <CollapsablePanel>
        <div>Panel 1</div>
    </CollapsablePanel>
    <CollapsablePanel>
        <div>Panel 1</div>
    </CollapsablePanel>
</Collapsable>
```

You can add *accordion* in the `<Collapsable>` label:
```HTML
<Collapsable accordion>
```
The component **Collapsable** with attribute `accordion` will make sure the number of the open `<CollapsablePanel>`s no more than 1. If user try to open a panel while another panel is open, the another one will be closed.

### Dialog

#### Introduction

The component **Dialog** has 1 label:`<Dialog>`. It will float over the page if attribute `visible` is set to `true`. When the attribute changes, an animation `visible` will occur.

#### Usage

Import the component(The filepath might be different in your environment):
```JS
import {Dialog} from '../../components/Dialog'
```
and use the component like this:
```HTML
<Dialog visible={is_dialog_visible}>
    <div>This is the content of dialog.</div>
</Dialog>
```

Change the value of the variable, the `<Dialog>` will fade in/out.

### Ripple

#### Introduction

The component **Ripple** has 1 label:`<Ripple>`. When the label contained `<Ripple>` is clicked, a ripple effect will occur for response.

#### Usage

Import the component(The filepath might be different in your environment):
```JS
import {Ripple} from '../../components/Ripple'
```
and use the component like this:
```HTML
<div style={{position: relative}}>
    <Ripple/>
</div>
```

The outer label must set the style `position: relative` or `position: absolute` cause the `<Ripple>` has the style `position: absolute` for positioning

### Button

The component **Button** has 1 label:`<Button>`.

#### Usage

Import the component(The filepath might be different in your environment):
```JS
import {Button} from '../../components/Button'
```
and use the component like this:
```HTML
<Button>Click me!</Button>
```
The component **Button** will automatically import component **Ripple**.
