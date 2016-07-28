# React Material

## Components

### Tab

#### Introduction

The component **Tab** provides an area for displaying large blocks of information.

**Tab** has 2 labels: `<Tab>` and `<TabPanel>`. The latter ones should be wrapped in the former one. It will automatically generate `<TabSelector>`s for selecting `<TabPanel>`s.

#### Properties

##### Tab
| Name   | Type    | Default Value | Usage |
|--------|---------|---------------|-------|

##### TabPanel

| Name   | Type    | Default Value | Usage |
|--------|---------|---------------|-------|
| name   | String  | <No Default>  | Name of each panel. It will be used to generate corresponding `<TabSelector>`.
| active | Boolean | false         | Tab will be selected initially if active is set true. Only the first one will be set actived when there are more than one active panel. If no active panels, the first one will be set actived. |

#### Example

```HTML
<Tab>
    <TabPanel name="Tab 1">
        <div>Panel 1</div>
    </TabPanel>
    <TabPanel name="Tab 2" active="true">
        <div>Panel 1</div>
    </TabPanel>
    <TabPanel name="Tab 3" active="false">
        <div>Panel 1</div>
    </TabPanel>
</Tab>
```

The `<TabPanel>` named 'Tab 2' will be initially set active.

### Collapsable

#### Introduction

The component **Collapsable** provides an area which could be folded and deployed.

**Collapsable** has 2 labels: `<Collapsable>` and `<CollapsablePanel>`. The latter ones should be wrapped in the former one.

#### Properties

##### Collapsable

| Name      | Type    | Default Value | Usage |
|-----------|---------|---------------|-------|
| accordion | Boolean | false         | Accortion type Collapsable will make sure that there is no more than one panel set actived.

##### CollapsablePanel

| Name   | Type    | Default Value | Usage |
|--------|---------|---------------|-------|
| active | Boolean | false         | Collapsable will be actived initially if active is set true. In accordion type Collapsable, only the first one will be set actived. |

#### Example

```HTML
<Collapsable accordion="true">
    <CollapsablePanel active="true">
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

The first `<CollapsablePanel>` will automatically opened. When user selects a panel, all other panels will close.

### Dialog

#### Introduction

The component **Dialog** has 1 label:`<Dialog>`. It will float over the page if attribute `visible` is set to `true`. When the attribute changes, an animation `visible` will occur.

#### Properties

##### Dialog

| Name    | Type    | Default Value | Usage |
|---------|---------|---------------|-------|
| visible | Boolean | false         | It decides whether the Dialog will be displayed or not. |

#### Example

```HTML
<Dialog visible={is_dialog_visible}>
    <div>This is the content of dialog.</div>
</Dialog>
```

Change the value of the variable, the `<Dialog>` will fade in/out.

### Ripple

#### Introduction

The component **Ripple** provides the ripple effect when user clicks the parent component.

**Ripple** has 1 label:`<Ripple>`. When the label contained `<Ripple>` is clicked, a ripple effect will occur for response.

The outer label must set the style `position: relative` or `position: absolute` cause the `<Ripple>` has the style `position: absolute` for positioning

#### Properties

##### Ripple

| Name    | Type   | Default Value | Usage |
|---------|--------|---------------|-------|
| color   | String | <No Default>  | Color decides the color of `<Ripple>`. It can be 'white', 'red' or 'blue'. |

#### Example

```HTML
<div style={{position: relative}}>
    <Ripple color="blue"/>
</div>
```

### Button

The component **Button** has 1 label:`<Button>`.

**Button** will automatically import component **Ripple**.

#### Properties

##### Button

| Name        | Type   | Default Value | Usage |
|-------------|--------|---------------|-------|
| rippleColor | String | <No Default>  | The color of the `<Ripple>` inside. See Ripple->Properties. |

#### Example

```HTML
<Button rippleColor="blue">Click me!</Button>
```
