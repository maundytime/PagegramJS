var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// projects/story0/index.ts
var story0_exports = {};
__export(story0_exports, {
  PageAnimation: () => PageAnimation,
  PageAnimationInNav: () => PageAnimationInNav,
  PageMatrix: () => PageMatrix,
  PageMatrixH: () => PageMatrixH,
  PageMatrixHInNav: () => PageMatrixHInNav,
  PageMatrixInNav: () => PageMatrixInNav,
  PagePresent: () => PagePresent,
  PagePresentInNav: () => PagePresentInNav,
  PagePushPop1: () => PagePushPop1,
  PagePushPop2: () => PagePushPop2,
  PagePushPopInNav: () => PagePushPopInNav,
  PageStack: () => PageStack,
  PageStack1: () => PageStack1,
  PageStack1InNav: () => PageStack1InNav,
  PageStackInNav: () => PageStackInNav,
  PageTest: () => PageTest,
  PageTest1: () => PageTest1,
  PageTestInNav: () => PageTestInNav,
  Tab: () => Tab,
  asyncFunctionError: () => asyncFunctionError,
  changeNavInfo: () => changeNavInfo,
  decreaseStackCountFunction: () => decreaseStackCountFunction,
  greet: () => greet,
  increaseStackCountFunction: () => increaseStackCountFunction,
  infoDidChange: () => infoDidChange,
  infoFromParentDidChange: () => infoFromParentDidChange,
  makePageNav: () => makePageNav,
  openaiTest: () => openaiTest,
  root: () => Tab,
  stackCountDidChange: () => stackCountDidChange,
  timeoutTest: () => timeoutTest,
  worldTimeTest: () => worldTimeTest
});

// types/event.ts
var br = {
  type: "break"
};

// types/util.ts
var edge = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var back = {
  style: {
    background: "#666"
  },
  dimension: edge
};
var back1 = {
  style: {
    background: "#999"
  },
  dimension: edge
};
var spacer = {
  type: "spacer"
};
var numbers = [
  "0 0 0 0 0",
  "1 1 1 1 1",
  "2 2 2 2 2",
  "3 3 3 3 3",
  "4 4 4 4 4"
];
var texts = [
  "[0] - The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[1] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[2] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[3] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[4] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[5] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[6] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[7] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[8] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[9] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[10] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[11] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[12] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[13] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[14] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[15] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[16] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[17] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[18] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[19] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[20] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[21] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[22] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[23] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[24] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[25] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[26] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[27] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[28] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[29] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[30] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[31] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[32] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[33] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[34] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[35] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[36] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[37] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[38] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[39] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[40] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[41] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[42] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[43] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[44] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[45] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[46] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[47] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[48] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[49] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[50] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[51] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[52] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[53] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[54] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[55] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[56] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[57] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[58] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[59] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[60] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[61] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[62] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[63] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[64] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[65] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[66] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[67] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[68] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[69] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[70] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[71] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[72] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[73] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[74] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[75] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[76] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[77] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[78] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[79] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[80] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[81] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[82] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[83] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[84] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[85] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[86] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[87] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[88] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[89] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[90] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[91] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[92] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[93] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[94] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[95] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[96] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[97] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[98] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[99] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[100] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[101] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[102] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[103] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[104] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[105] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[106] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[107] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[108] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[109] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[110] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[111] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[112] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[113] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[114] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[115] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[116] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[117] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[118] Success is not final, failure is not fatal: It is the courage to continue that counts.\nWinston Churchill's quote underscores the importance of resilience. Success and failure are both part of life's journey, but it is the determination to keep going that truly matters.",
  "[119] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.",
  "[120] You miss 100% of the shots you don't take.\nThis quote, often attributed to Wayne Gretzky, serves as a powerful reminder of the importance of taking risks and seizing opportunities. Without taking action, there can be no progress or success.",
  "[121] The journey of a thousand miles begins with one step.\nThis ancient Chinese proverb reminds us that even the longest and most difficult ventures have a starting point; it encourages taking the first step, no matter how daunting the task may seem.",
  "[122] In the end, \n\n\n\nwe will remember not the words of our enemies, but the silence of our friends.\nMartin Luther King Jr.'s words emphasize the importance of standing up for what is right, even in the face of adversity. Silence, in the face of injustice, is a powerful action in itself.",
  "[123] Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\nThis quote from Buddha teaches the value of mindfulness, the importance of focusing on the present rather than being caught up in regrets about the past or anxiety about the future.",
  "[124] Education is the most powerful weapon which you can use to change the world.\nNelson Mandela's famous words highlight the transformative power of education. Through learning and knowledge, we have the ability to make a profound impact on society and shape a better future.",
  "[125] The only way to do great work is to love what you do.\nSteve Jobs' advice encourages us to pursue our passions and find joy in our work. When we love what we do, we are more likely to achieve excellence and find fulfillment.",
  "[126] The only limit to our realization of tomorrow is our doubts of today.\nFranklin D. Roosevelt's words remind us that self-doubt can be our biggest obstacle. Belief in our potential and abilities is crucial for achieving our future goals.",
  "[127] Happiness is not something ready made. It comes from your own actions.\nThis quote from the Dalai Lama emphasizes that happiness is a result of our own efforts and choices, rather than something that can be obtained externally or handed to us.",
  "[128] It is during our darkest moments that we must focus to see the light.\nAristotle Onassis's words highlight the power of hope and perseverance, even in times of great difficulty. By focusing on the positives, we can find our way out of the darkest situations.-"
];

// projects/story0/page-nav.ts
function makePageNav(subpages2) {
  const title = {
    text: {
      content: [
        {
          content: "123",
          size: 12
        },
        {
          content: "456"
        },
        {
          content: "\n789",
          size: 12,
          color: "#0fF3"
        }
      ],
      lineHeightMultiple: 1.5,
      size: 20,
      color: "#0fF",
      lines: 0
    },
    dimension: {
      centerX: 0,
      centerY: 0
    },
    style: {
      background: "#0003"
    }
  };
  const dismissButton = {
    type: "touchFade",
    onTap: "dismiss",
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      right: 0
    },
    style: {
      background: "#0003"
    }
  };
  const popButton = {
    type: "touchFade",
    id: "popButton",
    onTap: "pop",
    dimension: {
      height: 60,
      width: 60,
      top: 0,
      left: 0
    },
    style: {
      opacity: 0,
      background: "#0003"
    }
  };
  const nav = {
    type: "nav",
    subpages: subpages2,
    subviews: {
      type: "blur",
      dimension: {
        top: 0,
        left: 0,
        right: 0,
        unsafeAt: "top"
      },
      style: {
        background: "#0003"
      },
      subviews: {
        dimension: {
          left: 0,
          right: 0,
          height: 60,
          bottom: 0,
          topSafe: 0
        },
        subviews: [
          popButton,
          { ...title, type: "label" },
          { ...title, type: "text" },
          dismissButton
        ]
      }
    },
    stateMap: {
      stackCount: {
        type: "state",
        value: 0,
        onChange: "stackCountDidChange"
      }
    },
    onPush: "onPush",
    onPop: "onPop",
    eventMap: {
      stackCountDidChange: "stackCountDidChange",
      dismiss: {
        type: "navigation",
        navigation: "dismiss"
      },
      pop: {
        type: "navigation",
        navigation: "pop"
      },
      onPush: "increaseStackCountFunction",
      onPop: "decreaseStackCountFunction"
    }
  };
  return nav;
}
function increaseStackCountFunction(argument) {
  return updateStackCountHelper(argument, 1);
}
function decreaseStackCountFunction(argument) {
  return updateStackCountHelper(argument, -1);
}
function stackCountDidChange(argument) {
  const value = argument.stateInfo["stackCount"];
  return {
    type: "view",
    view: {
      popButton: {
        style: {
          opacity: value === 0 ? 0 : 1
        }
      }
    },
    duration: 0.5
  };
}
function updateStackCountHelper(argument, diff) {
  const value = argument.stateInfo["stackCount"];
  return {
    type: "state",
    state: {
      stackCount: value + diff
    }
  };
}

// projects/story0/page-present.ts
var PageAnimation = {
  subviews: {
    dimension: edge,
    style: {
      background: "#fff"
    },
    subviews: {
      dimension: {
        topSafe: 0,
        bottomSafe: 0,
        left: 0,
        right: 0
      },
      style: {
        background: "#0003"
      },
      subviews: [
        {
          id: "symbol1",
          type: "symbol",
          symbol: {
            name: "square",
            size: 50,
            color: "#000"
          },
          style: {
            background: "#3333"
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 50,
            height: 50
          }
        },
        {
          id: "removeView",
          dimension: {
            height: 60,
            left: 0,
            right: 120,
            bottom: 0
          },
          subviews: {
            id: "text1",
            type: "label",
            text: { content: "text test" },
            dimension: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          style: {
            background: "#f00"
          }
        },
        {
          type: "touchFade",
          onTap: "sizeTo100",
          dimension: {
            height: 60,
            width: 60,
            right: 0,
            bottom: 0
          },
          style: {
            background: "#0003"
          }
        },
        {
          type: "touchFade",
          onTap: "sizeTo200",
          dimension: {
            height: 60,
            width: 60,
            right: 60,
            bottom: 0
          },
          style: {
            background: "#3333"
          }
        }
      ]
    }
  },
  eventMap: {
    dismissButtonDidTap: {
      type: "navigation",
      navigation: "dismiss"
    },
    sizeTo100: [
      {
        type: "view",
        duration: 0.5,
        view: {
          removeView: {
            style: { opacity: 0 }
          }
        }
      },
      br,
      {
        type: "view",
        duration: 2,
        view: {
          removeView: {
            style: { opacity: 1 }
          },
          text1: {
            id: "text1",
            type: "label",
            text: { content: "CHANGE" }
          },
          symbol1: {
            symbol: {
              name: "square",
              size: 100,
              color: "#000"
            },
            style: {
              transform: {
                rotate: 30
              }
            },
            dimension: {
              centerX: 0,
              centerY: 0,
              width: 100,
              height: 100
            }
          }
        }
      }
    ],
    sizeTo200: {
      type: "view",
      view: {
        symbol1: {
          symbol: {
            name: "square",
            size: 200,
            color: "#00f"
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 200,
            height: 200
          },
          style: {
            transform: {
              rotate: 0
            }
          }
        },
        text1: {
          text: { content: "text1" },
          style: {
            background: "#0003"
          }
        }
      },
      duration: 2
    }
  }
};
var PageAnimationInNav = makePageNav(["PageAnimation"]);
var PagePresentInNav = makePageNav(["PagePresent"]);
var PagePresent = {
  subviews: {
    dimension: edge,
    style: {
      background: "#fff"
    },
    subviews: {
      type: "touchFade",
      onTap: "present",
      dimension: {
        height: 100,
        width: 100,
        centerX: 0,
        centerY: 0
      },
      style: {
        background: "#0003"
      }
    }
  },
  eventMap: {
    present: {
      type: "navigation",
      navigation: "overlay",
      pageName: "PageAnimationInNav"
    }
  }
};

// projects/story0/page-matrix.ts
var PageMatrixInNav = makePageNav(["PageMatrix"]);
var PageMatrix = {
  subviews: {
    type: "scroll",
    dimension: edge,
    subviews: {
      type: "matrix",
      dimension: {
        widthSafe: "100%",
        top: 0,
        bottom: 0,
        leftSafe: 0,
        right: 0
      },
      style: {
        background: "#eee"
      },
      matrix: {
        content: Array.from(texts, (content) => ({
          type: "stack",
          dimension: edge,
          stack: {
            direction: "vertical"
          },
          subviews: [
            {
              type: "label",
              text: {
                content,
                design: "monospaced"
              },
              dimension: {
                left: 0,
                right: 0
              }
            },
            spacer
          ]
        })),
        itemSize: {
          width: "50%"
        },
        direction: "vertical"
      }
    }
  }
};

// projects/story0/page-matrix-h.ts
var PageMatrixHInNav = makePageNav(["PageMatrixH"]);
var PageMatrixH = {
  subviews: {
    type: "scroll",
    dimension: edge,
    subviews: {
      type: "matrix",
      dimension: {
        heightSafe: "100%",
        topSafe: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      style: {
        background: "#eee"
      },
      matrix: {
        content: Array.from(texts, (content) => ({
          type: "stack",
          dimension: edge,
          stack: {
            direction: "vertical"
          },
          subviews: [
            {
              type: "label",
              text: {
                content,
                design: "monospaced"
              },
              dimension: {
                left: 0,
                right: 0
              }
            },
            spacer
          ]
        })),
        itemSize: {
          height: "50%",
          width: 200
        },
        direction: "horizontal"
      }
    }
  }
};

// projects/story0/page-push.ts
function makePage(flag) {
  return {
    stateMap: {
      info: {
        type: "state",
        value: flag ? "yellow" : "purple",
        onChange: "infoDidChange"
      },
      infoFromParent: {
        type: "bind",
        onChange: "infoFromParentDidChange"
      }
    },
    eventMap: {
      infoDidChange: "infoDidChange",
      infoFromParentDidChange: "infoFromParentDidChange",
      worldTimeTest: "worldTimeTest",
      changeNavInfo: "changeNavInfo"
    },
    subviews: {
      dimension: edge,
      style: {
        background: flag ? "#ffc" : "#ccf"
      },
      subviews: [
        {
          id: "infoLabel",
          type: "label",
          text: {
            content: "infoLabel"
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 0
          }
        },
        {
          id: "infoFromParentLabel",
          type: "label",
          text: {
            content: "infoFromParentLabel"
          },
          dimension: {
            height: 20,
            centerX: 0,
            topSafe: 20
          }
        },
        {
          type: "touchFade",
          onTap: flag ? "pushPage2" : "pushPage1",
          dimension: {
            height: 200,
            width: 100,
            centerX: 0,
            centerYSafe: 0
          },
          style: {
            background: flag ? "#fff" : "#000"
          }
        },
        {
          type: "touchFade",
          onTap: ["worldTimeTest", "changeNavInfo"],
          dimension: {
            height: 100,
            width: 100,
            centerX: 0,
            bottomSafe: 0
          },
          style: {
            background: "#f55"
          }
        }
      ]
    }
  };
}
var PagePushPop1 = makePage(true);
var PagePushPop2 = makePage(false);
var PagePushPopInNav = (() => {
  const nav = makePageNav(["PagePushPop1"]);
  nav.eventMap = {
    ...nav.eventMap,
    pushPage2: {
      type: "navigation",
      navigation: "push",
      pageName: "PagePushPop2"
    },
    pushPage1: {
      type: "navigation",
      navigation: "push",
      pageName: "PagePushPop1"
    }
  };
  nav.stateMap = {
    ...nav.stateMap,
    infoFromParent: {
      type: "state",
      value: "PagePushPop1"
    }
  };
  return nav;
})();
function changeNavInfo(_) {
  return {
    type: "state",
    state: {
      infoFromParent: "PagePushPop1" + Math.random()
    }
  };
}
function infoDidChange(argument) {
  const info = argument.stateInfo["info"];
  return {
    type: "view",
    view: {
      infoLabel: {
        text: {
          content: `page is ${info}`
        }
      }
    }
  };
}
function infoFromParentDidChange(argument) {
  const infoFromParent = argument.stateInfo["infoFromParent"];
  return {
    type: "view",
    view: {
      infoFromParentLabel: {
        text: {
          content: `parent is ${infoFromParent}`
        }
      }
    }
  };
}

// projects/story0/page-stack.ts
var PageStackInNav = makePageNav(["PageStack"]);
var PageStack1InNav = makePageNav(["PageStack1"]);
var PageStack = {
  subviews: {
    type: "scroll",
    dimension: edge,
    style: { background: "#f003" },
    subviews: {
      type: "stack",
      dimension: {
        top: 0,
        leftSafe: 0,
        rightSafe: 0,
        bottom: 0
      },
      style: { background: "#f00", opacity: 1 },
      stack: {
        direction: "vertical",
        distribution: "fill"
      },
      subviews: [
        {
          style: { background: "#f003" },
          type: "label",
          text: {
            content: texts[0],
            design: "monospaced"
          },
          dimension: {
            width: "100%"
          }
        },
        {
          type: "stack",
          style: { background: "#0002" },
          stack: {
            direction: "horizontal",
            distribution: "fillEqually",
            alignment: "leading"
          },
          dimension: {
            // width: 150,
          },
          subviews: [
            {
              type: "label",
              text: {
                content: texts[1],
                design: "monospaced"
              },
              style: { background: "#00f3" }
            },
            {
              type: "label",
              text: {
                content: texts[2],
                design: "monospaced"
              },
              style: { background: "#0f03" }
            }
          ]
        },
        {
          type: "label",
          text: {
            content: texts[3],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
        // spacer,
      ]
    }
  }
};
var PageStack1 = {
  subviews: [
    {
      type: "stack",
      dimension: {
        top: 200,
        left: 0,
        width: 300,
        height: 200
      },
      style: { background: "#0008", opacity: 1 },
      stack: {
        distribution: "fill",
        direction: "vertical"
      },
      subviews: [
        {
          type: "label",
          text: {
            content: numbers[0],
            design: "monospaced"
          },
          style: { background: "#00f3" }
        },
        {
          type: "stack",
          style: { background: "#f003" },
          stack: {
            direction: "horizontal",
            distribution: "fill"
          },
          subviews: [
            {
              type: "label",
              text: {
                content: numbers[1],
                design: "monospaced"
              },
              style: { background: "#00f3" }
            },
            {
              type: "label",
              text: {
                content: numbers[2],
                design: "monospaced"
              },
              style: { background: "#0f03" }
            }
          ]
        },
        {
          type: "label",
          text: {
            content: numbers[3],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
      ]
    },
    {
      dimension: {
        top: 500,
        left: 0,
        width: 300
      },
      type: "stack",
      style: { background: "#0008", opacity: 1 },
      stack: {
        direction: "horizontal",
        distribution: "fill"
      },
      subviews: [
        {
          type: "label",
          text: {
            content: numbers[1],
            design: "monospaced"
          },
          style: { background: "#00f3" }
        },
        {
          type: "label",
          text: {
            content: numbers[2],
            design: "monospaced"
          },
          style: { background: "#0f03" }
        }
      ]
    }
  ]
};

// projects/story0/page-test.ts
var PageTestInNav = (() => {
  const nav = makePageNav(["PageTest"]);
  nav.eventMap = {
    ...nav.eventMap,
    push: {
      type: "navigation",
      navigation: "push",
      pageName: "PageTest1"
    }
  };
  return nav;
})();
var PageTest = {
  subviews: [
    back,
    {
      type: "touchFade",
      dimension: {
        width: 200,
        height: 200
      },
      style: {
        background: "#00f"
      },
      onTap: "push"
    }
  ]
};
var PageTest1 = {
  subviews: [
    back1,
    {
      dimension: {
        leftSafe: 0,
        rightSafe: 0,
        topSafe: 0,
        bottomSafe: 0
      },
      subviews: {
        type: "label",
        text: {
          content: "hello world"
        },
        dimension: {
          left: 0,
          right: 0,
          height: 100,
          width: 102
        }
      }
    },
    {
      type: "touchFade",
      dimension: {
        width: 200,
        height: 200
      },
      onTap: "push"
    }
  ]
};

// types/native.ts
var NativeModule = NativeModuleManager;

// projects/story0/functions-test.ts
async function worldTimeTest() {
  return NativeModule.fetch("https://worldtimeapi.org/api/timezone/Etc/UTC").then((text) => {
    console.log(text);
  });
}
async function openaiTest() {
  return NativeModule.fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ""
    },
    body: JSON.stringify({
      messages: [
        {
          content: "\u4ECA\u5929",
          role: "user"
        }
      ],
      model: "gpt-3.5-turbo"
    })
  }).then((data) => JSON.parse(data));
}
async function timeoutTest() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve("Hello from JS async");
    }, 500);
  });
}
async function asyncFunctionError() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      try {
        throw new Error("Something went wrong!");
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error("Non-error object thrown"));
        }
      }
    }, 500);
  });
}
function greet(argument) {
  const a = argument.stateInfo["a"];
  const b = argument.stateInfo["b"];
  return "Hello, " + a + b + "!";
}

// projects/story0/page-tab.ts
var subpages = [
  // 'PageRssBarInNav',
  // 'PageRssInNav',
  "PagePushPopInNav",
  "PagePresentInNav",
  "PageMatrixHInNav",
  "PageMatrixInNav",
  "PageStackInNav",
  "PageStack1InNav"
];
var Tab = {
  type: "tab",
  subpages,
  subviews: [
    {
      style: {
        background: "#fff",
        zPosition: -1e3,
        interactive: false
      },
      dimension: edge
    },
    {
      type: "blur",
      dimension: {
        bottom: 0,
        left: 0,
        right: 0,
        unsafeAt: "bottom"
      },
      style: {
        background: "#00f3"
      },
      subviews: makeTabs()
    }
  ],
  eventMap: makeEventsMap()
};
function makeEventsMap() {
  const eventMap = {};
  for (const key of subpages) {
    eventMap[key] = {
      type: "navigation",
      pageName: key,
      navigation: "select"
    };
  }
  return eventMap;
}
function makeTabs() {
  return {
    type: "stack",
    stack: {
      direction: "horizontal",
      distribution: "fillProportionally"
    },
    dimension: {
      left: 0,
      right: 0,
      top: 0,
      bottomSafe: 0
    },
    style: {
      background: "#00f3"
    },
    subviews: Array.from(subpages, (v, i) => ({
      type: "touchFade",
      onTap: v,
      style: {
        background: "#0003"
      },
      dimension: {
        horizontal: 1,
        height: i === 2 ? 60 : 60
      },
      subviews: {
        type: "symbol",
        symbol: {
          name: "moon",
          size: 20,
          color: "#000"
        },
        dimension: edge
      }
    }))
  };
}
var pagegram=story0_exports;
