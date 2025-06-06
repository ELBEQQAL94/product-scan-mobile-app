# Health Profile Setup - Multiple Selection UX Design

## 🕐 **When to Show Profile Screen**

### **✅ RECOMMENDED: After User Sees Value**
```
App Download → Welcome → Start Scanning → 
After 3-5 scans → "Want better recommendations?" → Profile Setup
```

### **Contextual Triggers:**
```
User scans product with allergen → 
"This contains nuts. Want to set up allergy alerts?" → Profile Setup

User compares products → 
"Get personalized recommendations based on your health needs" → Profile Setup
```

## 📱 **Complete Multiple Selection Flow**

### **Step 1: Health Conditions (Multiple Selection Grid)**

```
┌─────────────────────────────┐
│ ← Back    Health Conditions │
│                     [1 of 3]│
│                            │
│ Select any that apply to you:│
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 🩺      │ │ 🫀      │   │
│ │Diabetes │ │High BP  │   │
│ │    ✓    │ │         │   │
│ └─────────┘ └─────────┘   │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 🤰      │ │ 💊      │   │
│ │Pregnant │ │Taking   │   │
│ │Nursing  │ │Meds     │   │
│ │    ✓    │ └─────────┘   │
│ └─────────┘               │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 🏃‍♀️      │ │ ❤️      │   │
│ │Weight   │ │Heart    │   │
│ │Management│ │Disease  │   │
│ └─────────┘ └─────────┘   │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 🦴      │ │ ❓      │   │
│ │Bone     │ │Other    │   │
│ │Health   │ │         │   │
│ └─────────┘ └─────────┘   │
│                            │
│ [Show more conditions...]  │
│                            │
│   [Continue (2 selected)]  │
│   [Skip for now]           │
└─────────────────────────────┘
```

### **Step 2: Allergies & Dietary Restrictions (Search + Quick Select)**

```
┌─────────────────────────────┐
│ ← Back      Allergies       │
│                     [2 of 3]│
│                            │
│ 🔍 Search allergies...     │
│ ┌─────────────────────────┐ │
│ │ nuts, dairy, gluten...  │ │
│ └─────────────────────────┘ │
│                            │
│ Common allergies:          │
│                            │
│ [🥜 Nuts ✓] [🥛 Dairy]    │
│ [🌾 Gluten] [🥚 Eggs ✓]   │
│ [🦐 Shellfish] [🥜 Soy]   │
│                            │
│ Dietary preferences:       │
│                            │
│ [🌱 Vegetarian] [🌿 Vegan] │
│ [🥩 Keto] [🍞 Low Carb]    │
│                            │
│ Selected (2):              │
│ • Tree Nuts                │
│ • Eggs                     │
│                            │
│   [Continue (2 selected)]  │
│   [Skip this step]         │
└─────────────────────────────┘
```

### **Step 3: Goals & Preferences (Optional)**

```
┌─────────────────────────────┐
│ ← Back       Goals          │
│                     [3 of 3]│
│                            │
│ What are your health goals? │
│ (Optional)                  │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 📉      │ │ 📈      │   │
│ │Lose     │ │Gain     │   │
│ │Weight   │ │Weight   │   │
│ │    ✓    │ │         │   │
│ └─────────┘ └─────────┘   │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ 💪      │ │ 🧘      │   │
│ │Build    │ │Manage   │   │
│ │Muscle   │ │Stress   │   │
│ └─────────┘ └─────────┘   │
│                            │
│ ┌─────────┐ ┌─────────┐   │
│ │ ⚡      │ │ 💤      │   │
│ │More     │ │Better   │   │
│ │Energy   │ │Sleep    │   │
│ └─────────┘ └─────────┘   │
│                            │
│   [Finish Setup]           │
│   [Skip this step]         │
└─────────────────────────────┘
```

### **Step 4: Confirmation & Preview**

```
┌─────────────────────────────┐
│        Profile Complete     │
│                            │
│ 👤 Your Health Profile     │
│                            │
│ ✅ Health Conditions (2):  │
│ • Diabetes                 │
│ • Pregnant/Nursing         │
│                            │
│ ⚠️ Allergies (2):          │
│ • Tree Nuts                │
│ • Eggs                     │
│                            │
│ 🎯 Goals (1):              │
│ • Lose Weight              │
│                            │
│ 💡 Preview Benefits:       │
│ ┌─────────────────────────┐ │
│ │ ✓ Personalized alerts  │ │
│ │ ✓ Safe product recs    │ │
│ │ ✓ Goal-based scoring   │ │
│ └─────────────────────────┘ │
│                            │
│   [🎉 Start Shopping!]     │
│   [← Edit Profile]         │
└─────────────────────────────┘
```

## 🎨 **React Native Implementation**

### **Main Health Conditions Screen:**
```jsx
const HealthConditionsScreen = () => {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const primaryConditions = [
    { id: 'diabetes', icon: '🩺', name: 'Diabetes', desc: 'Blood sugar management' },
    { id: 'hypertension', icon: '🫀', name: 'High Blood Pressure', desc: 'Heart health' },
    { id: 'pregnancy', icon: '🤰', name: 'Pregnant/Nursing', desc: 'Special nutrition needs' },
    { id: 'medications', icon: '💊', name: 'Taking Medications', desc: 'Drug interactions' },
    { id: 'weight', icon: '🏃‍♀️', name: 'Weight Management', desc: 'Losing or gaining weight' },
    { id: 'heart', icon: '❤️', name: 'Heart Disease', desc: 'Cardiovascular health' },
    { id: 'bone', icon: '🦴', name: 'Bone Health', desc: 'Osteoporosis, calcium needs' },
    { id: 'other', icon: '❓', name: 'Other', desc: 'Tell us more' }
  ];

  const secondaryConditions = [
    { id: 'kidney', icon: '🫘', name: 'Kidney Disease', desc: 'Protein/sodium restrictions' },
    { id: 'liver', icon: '🫀', name: 'Liver Disease', desc: 'Processing concerns' },
    { id: 'thyroid', icon: '🦋', name: 'Thyroid Issues', desc: 'Metabolism effects' },
    { id: 'arthritis', icon: '🦴', name: 'Arthritis', desc: 'Anti-inflammatory needs' }
  ];

  const toggleCondition = (id) => {
    setSelectedConditions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <ScrollView bg="gray.50">
      <VStack space={6} p={4} safeArea>
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center" space={3}>
            <IconButton 
              icon={<ArrowBackIcon />} 
              onPress={() => navigation.goBack()}
              size="lg"
            />
            <VStack>
              <Text fontSize="lg" fontWeight="bold">Health Conditions</Text>
              <Text fontSize="sm" color="gray.500">Step 1 of 3</Text>
            </VStack>
          </HStack>
        </HStack>

        {/* Instructions */}
        <VStack space={2}>
          <Text fontSize="md" color="gray.700">
            Select any that apply to you:
          </Text>
          <Text fontSize="sm" color="gray.500">
            This helps us give you personalized recommendations
          </Text>
        </VStack>

        {/* Primary Conditions Grid */}
        <Grid columns={2} space={3}>
          {primaryConditions.map(condition => (
            <ConditionCard
              key={condition.id}
              condition={condition}
              selected={selectedConditions.includes(condition.id)}
              onPress={() => toggleCondition(condition.id)}
            />
          ))}
        </Grid>

        {/* Show More Toggle */}
        <Button 
          variant="ghost" 
          colorScheme="blue"
          onPress={() => setShowMore(!showMore)}
          leftIcon={showMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          {showMore ? 'Show less conditions' : 'Show more conditions'}
        </Button>

        {/* Secondary Conditions (Expandable) */}
        {showMore && (
          <Grid columns={2} space={3}>
            {secondaryConditions.map(condition => (
              <ConditionCard
                key={condition.id}
                condition={condition}
                selected={selectedConditions.includes(condition.id)}
                onPress={() => toggleCondition(condition.id)}
              />
            ))}
          </Grid>
        )}

        {/* Selected Count & Continue */}
        <VStack space={3} mt={6}>
          {selectedConditions.length > 0 && (
            <Box bg="blue.50" p={3} rounded="lg">
              <Text color="blue.700" fontSize="sm">
                Selected {selectedConditions.length} condition{selectedConditions.length !== 1 ? 's' : ''}
              </Text>
            </Box>
          )}

          <Button 
            size="lg"
            colorScheme="blue"
            onPress={() => navigation.navigate('AllergiesScreen')}
            isDisabled={selectedConditions.length === 0}
          >
            Continue ({selectedConditions.length} selected)
          </Button>
          
          <Button 
            variant="ghost" 
            onPress={() => navigation.navigate('AllergiesScreen')}
          >
            Skip for now
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
```

### **Condition Card Component:**
```jsx
const ConditionCard = ({ condition, selected, onPress }) => (
  <Pressable onPress={onPress}>
    {({ isPressed }) => (
      <Box
        bg={selected ? "blue.50" : "white"}
        borderColor={selected ? "blue.500" : "gray.200"}
        borderWidth="2"
        rounded="xl"
        p="4"
        shadow={selected ? "md" : "sm"}
        position="relative"
        transform={isPressed ? [{ scale: 0.98 }] : [{ scale: 1 }]}
        transition="all 0.2s"
      >
        {/* Selection Indicator */}
        {selected && (
          <Box
            position="absolute"
            top="3"
            right="3"
            bg="blue.500"
            rounded="full"
            size="6"
            justifyContent="center"
            alignItems="center"
          >
            <Icon as={CheckIcon} color="white" size="xs" />
          </Box>
        )}
        
        {/* Content */}
        <VStack space={3} alignItems="center">
          <Text fontSize="2xl">{condition.icon}</Text>
          <VStack space={1} alignItems="center">
            <Text fontWeight="bold" textAlign="center" fontSize="sm">
              {condition.name}
            </Text>
            <Text fontSize="xs" color="gray.600" textAlign="center">
              {condition.desc}
            </Text>
          </VStack>
        </VStack>
      </Box>
    )}
  </Pressable>
);
```

### **Allergies Screen with Search:**
```jsx
const AllergiesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);

  const commonAllergies = [
    { id: 'nuts', name: 'Tree Nuts', icon: '🥜' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'gluten', name: 'Gluten', icon: '🌾' },
    { id: 'eggs', name: 'Eggs', icon: '🥚' },
    { id: 'shellfish', name: 'Shellfish', icon: '🦐' },
    { id: 'soy', name: 'Soy', icon: '🫘' },
  ];

  const dietaryPreferences = [
    { id: 'vegetarian', name: 'Vegetarian', icon: '🌱' },
    { id: 'vegan', name: 'Vegan', icon: '🌿' },
    { id: 'keto', name: 'Keto', icon: '🥩' },
    { id: 'lowcarb', name: 'Low Carb', icon: '🍞' },
  ];

  const toggleAllergy = (id) => {
    setSelectedAllergies(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleDietary = (id) => {
    setSelectedDietary(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <ScrollView bg="gray.50">
      <VStack space={6} p={4} safeArea>
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center" space={3}>
            <IconButton 
              icon={<ArrowBackIcon />} 
              onPress={() => navigation.goBack()}
            />
            <VStack>
              <Text fontSize="lg" fontWeight="bold">Allergies & Diet</Text>
              <Text fontSize="sm" color="gray.500">Step 2 of 3</Text>
            </VStack>
          </HStack>
        </HStack>

        {/* Search Input */}
        <VStack space={3}>
          <Text fontSize="md" color="gray.700">
            Any allergies or dietary restrictions?
          </Text>
          <Input
            placeholder="Search allergies (nuts, dairy, gluten...)"
            value={searchText}
            onChangeText={setSearchText}
            size="lg"
            InputLeftElement={
              <Icon as={SearchIcon} size="md" ml="3" color="gray.400" />
            }
          />
        </VStack>

        {/* Common Allergies */}
        <VStack space={3}>
          <Text fontSize="md" fontWeight="semibold">Common allergies:</Text>
          <Wrap space={2}>
            {commonAllergies.map(allergy => (
              <Pressable key={allergy.id} onPress={() => toggleAllergy(allergy.id)}>
                <Badge
                  colorScheme={selectedAllergies.includes(allergy.id) ? "red" : "gray"}
                  rounded="full"
                  px="4"
                  py="2"
                  _text={{ fontSize: "md" }}
                  variant={selectedAllergies.includes(allergy.id) ? "solid" : "outline"}
                >
                  {allergy.icon} {allergy.name}
                </Badge>
              </Pressable>
            ))}
          </Wrap>
        </VStack>

        {/* Dietary Preferences */}
        <VStack space={3}>
          <Text fontSize="md" fontWeight="semibold">Dietary preferences:</Text>
          <Wrap space={2}>
            {dietaryPreferences.map(diet => (
              <Pressable key={diet.id} onPress={() => toggleDietary(diet.id)}>
                <Badge
                  colorScheme={selectedDietary.includes(diet.id) ? "green" : "gray"}
                  rounded="full"
                  px="4"
                  py="2"
                  _text={{ fontSize: "md" }}
                  variant={selectedDietary.includes(diet.id) ? "solid" : "outline"}
                >
                  {diet.icon} {diet.name}
                </Badge>
              </Pressable>
            ))}
          </Wrap>
        </VStack>

        {/* Selected Summary */}
        {(selectedAllergies.length > 0 || selectedDietary.length > 0) && (
          <Box bg="orange.50" p={4} rounded="lg">
            <Text fontSize="sm" fontWeight="bold" color="orange.700" mb={2}>
              Selected ({selectedAllergies.length + selectedDietary.length}):
            </Text>
            {selectedAllergies.map(id => {
              const allergy = commonAllergies.find(a => a.id === id);
              return (
                <Text key={id} fontSize="sm" color="orange.600">
                  • {allergy?.name}
                </Text>
              );
            })}
            {selectedDietary.map(id => {
              const diet = dietaryPreferences.find(d => d.id === id);
              return (
                <Text key={id} fontSize="sm" color="orange.600">
                  • {diet?.name}
                </Text>
              );
            })}
          </Box>
        )}

        {/* Continue Buttons */}
        <VStack space={3} mt={6}>
          <Button 
            size="lg"
            colorScheme="blue"
            onPress={() => navigation.navigate('GoalsScreen')}
          >
            Continue ({selectedAllergies.length + selectedDietary.length} selected)
          </Button>
          
          <Button 
            variant="ghost" 
            onPress={() => navigation.navigate('GoalsScreen')}
          >
            Skip this step
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
```

## 🎯 **Key UX Improvements**

### **1. Visual Selection Over Forms**
- Large tappable cards instead of checkboxes
- Emoji icons for instant recognition
- Clear selected state with checkmarks

### **2. Progressive Enhancement**
- Core conditions first, advanced under "Show more"
- Optional steps clearly marked
- Can skip any step

### **3. Immediate Feedback**
- Real-time selection counter
- Visual selection states
- Preview of benefits

### **4. Mobile-Optimized**
- 2-column grid for optimal thumb reach
- Large touch targets (minimum 60px)
- Generous spacing between options

### **5. Non-Tech User Friendly**
- Simple language ("Select any that apply")
- Visual icons reduce reading burden
- Clear progress indication
- Easy to edit/change selections

This approach gives users full control and overview while being much faster than conversation flow!