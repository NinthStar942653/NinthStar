# React Material

## Components

### Tab

#### Introduction

The component **Tab** provides an area for displaying large blocks of information.

**Tab** has 2 labels: `<Tab>` and `<TabPanel>`. The latter ones should be wrapped in the former one. It will automatically generate `<TabSelector>`s for selecting `<TabPanel>`s.

#### Properties

##### TabPanel

| Name   | Type    | Default Value | Usage |
|--------|---------|---------------|-------|
| name   | String  | -No Default-  | Name of each panel. It will be used to generate corresponding `<TabSelector>`.
| active | Boolean | false         | Tab will be selected initially if active is set true. Only the first one will be set actived when there are more than one active panel. If no active panels, the first one will be set actived. |

#### Example

```HTML
<Tab>
    <TabPanel name="Tab 1">
        <div>Panel 1</div>
    </TabPanel>
    <TabPanel name="Tab 2" active="true">
        <div>Panel 2</div>
    </TabPanel>
    <TabPanel name="Tab 3" active="false">
        <div>Panel 3</div>
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

| Name    | Type    | Default Value | Usage |
|---------|---------|---------------|-------|
| active  | Boolean | false         | Collapsable will be actived initially if active is set true. In accordion type Collapsable, only the first one will be set actived. |
| disable | Boolean | false         | Collapsable will be unable to open if disable is set true. |

#### Example

```HTML
<Collapsable accordion="true">
    <CollapsablePanel active="true">
        <div>Panel 1</div>
    </CollapsablePanel>
    <CollapsablePanel disable="true">
        <div>Panel 2</div>
    </CollapsablePanel>
    <CollapsablePanel>
        <div>Panel 3</div>
    </CollapsablePanel>
</Collapsable>
```

The first `<CollapsablePanel>` will automatically opened, and the second one will be disabled. When user selects a panel, all other panels will close.

### Dialog

#### Introduction

The component **Dialog** has 1 label:`<Dialog>`. It will float over the page if attribute `visible` is set to `true`. When the attribute changes, an animation `visible` will occur.

#### Properties

##### Dialog

| Name    | Type    | Default Value | Usage |
|---------|---------|---------------|-------|
| visible | Boolean | false         | It decides whether the `<Dialog>` will be displayed or not. |

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
| color   | String | -No Default-  | Color decides the color of `<Ripple>`. It can be 'white', 'red' or 'blue'. |

#### Example

```HTML
<div style={{position: relative}}>
    <Ripple color="blue"/>
</div>
```

### Button

#### Introduction

The component **Button** is a basic component responsing to user click events.

**Button** has 1 label:`<Button>`.

It will automatically use `<Ripple>` for response.

#### Properties

##### Button

| Name        | Type   | Default Value | Usage |
|-------------|--------|---------------|-------|
| rippleColor | String | -No Default-  | The color of the `<Ripple>` inside. See Ripple->Properties. |

#### Example

```HTML
<Button rippleColor="blue">Click me!</Button>
```

### Card

#### Introduction

The component **Card** provides several ways to display different type of information.

**Card** has 4 labels: `<Card>`, `<CardTitle>`, `<CardImg>` and `<CardItem>`. The `<CardTitle>`, `<CardImg>` and `<CardItem>` should be wrapped in the first one.

The `<CardTitle>` will be rendered as an `<h3>` label. If it's wrapped in a `<CardImg>` it will be set lower-left in the image.

The `<CardImg>` can be used to wrap label `<img>`.

The `<CardItem>` will be rendered as a `<div>` which can contain various contents. It can contain `<img>` but it's deprecated.

#### Example

```HTML
<Card style={{width: 400}}>
	<CardTitle>This is a card</CardTitle>
	<CardImg>
		<img src={Img_1}/>
		<CardTitle>Title</CardTitle>
		<Ripple color='blue'/>
	</CardImg>
	<CardItem>
		<p>This is a text in card item</p>
		<p>This is another text in card item</p>
	</CardItem>
</Card>
```

### Input

#### Introduction

The component **Input** is a basic component receiving user inputs.

**Input** has 1 label: `<Input>`.

#### Properties

##### Input

| Name     | Type     | Default Value | Usage |
|----------|----------|---------------|-------|
| value    | Number   | 0             | Initial value of `<Input>` |
| onChange | Function | -No Default-  | The callback function when user modify the value of `<Input>`. Receiving (Number) as parameter. |

#### Example

```HTML
<Input value="3" onChange={onChange}/>
```

The value of `<Input>` will be 3 initially. When user change the value, onChange(evt.target.value) will be called.

### Slider

#### Introduction

The component **Slider** is a component receiving value inputs.

**Slider** has 3 labels: `<Slider>`, `<SliderBar>` and `<SliderInput>`. The `<SliderBar>` and `<SliderInput>` should be wrapped in the first one.

#### Properties

##### Slider

| Name     | Type     | Default Value | Usage |
|----------|----------|---------------|-------|
| min      | Number   | -No Default-  | The min value of `<Slider>`. Must be set. |
| max      | Number   | -No Default-  | The max value of `<Slider>`. Must be set. |
| step     | Number   | -No Default-  | The minimum value change of `<Slider>`. Must be set. |
| value    | Number   | 0             | The initial value of `<Slider>`. Must be set. |
| type     | RESERVED | RESERVED      | RESERVED |

#### Example

```HTML
<Slider min="0" max="100" step="1" value="10">
	<SliderBar/>
	<SliderInput/>
</Slider>
```
