import { decompressFromBase64 } from 'lz-string';
import * as fs from 'fs';

const convertEp2h = (input: string) => {
  let character: any = {};
  const contents = fs.readFileSync(input, 'utf-8');

  for (let line of contents.split('\n')) {
    if (!line.startsWith('//')) {
      const result = decompressFromBase64(line);

      if (result) {
        character = {
          ...JSON.parse(result),
        }
      }
    }
  }

  return character;
};

const createFoundryActor = (input: string, output: string) => {
  const ep2h = convertEp2h(input);

  const convertSkill = (skillName: string) => {

    const skill = ep2h.skills.find((skill: any) => skill.name === skillName) || {
      rank: 0,
      specializations: []
    };

    return {
      points: skill.rank,
      specialization: skill.specializations.join(" ")
    };
  };

  const actor = {
    "name": ep2h.name,
    "type": "character",
    "prototypeToken": {
      "actorLink": true,
      "name": "test",
      "displayName": 0,
      "texture": {
        "src": "", // TODO
        "scaleX": 1,
        "scaleY": 1,
        "offsetX": 0,
        "offsetY": 0,
        "rotation": 0,
        "tint": null
      },
      "width": 1,
      "height": 1,
      "lockRotation": false,
      "rotation": 0,
      "alpha": 1,
      "disposition": -1,
      "displayBars": 0,
      "bar1": {
        "attribute": null
      },
      "bar2": {
        "attribute": null
      },
      "light": {
        "alpha": 0.5,
        "angle": 360,
        "bright": 0,
        "color": null,
        "coloration": 1,
        "dim": 0,
        "attenuation": 0.5,
        "luminosity": 0.5,
        "saturation": 0,
        "contrast": 0,
        "shadows": 0,
        "animation": {
          "type": null,
          "speed": 5,
          "intensity": 5,
          "reverse": false
        },
        "darkness": {
          "min": 0,
          "max": 1
        }
      },
      "sight": {
        "enabled": false,
        "range": null,
        "angle": 360,
        "visionMode": "basic",
        "color": null,
        "attenuation": 0.1,
        "brightness": 0,
        "saturation": 0,
        "contrast": 0
      },
      "detectionModes": [],
      "flags": {},
      "randomImg": false
    },
    "img": "", // TODO
    "system": {
      "description": "",
      "reference": "",
      "fakeId": "",
      "aptitudes": {
        "cog": ep2h.cog_base,
        "int": ep2h.int_base,
        "ref": ep2h.ref_base,
        "sav": ep2h.sav_base,
        "som": ep2h.som_base,
        "wil": ep2h.wil_base
      },
      "temporary": [],
      "favoriteItems": [],
      "purchaseLog": [],
      "fieldSkills": {
        "exotic": ep2h.skills.filter((skill: any) => skill.name.startsWith("Exotic: ")).map((skill: any) => ({
          points: skill.rank,
          specialization: skill.specializations.join(" ")
        })),
        "hardware": ep2h.skills.filter((skill: any) => skill.name.startsWith("Hardware: ")).map((skill: any) => ({
          points: skill.rank,
          specialization: skill.specializations.join(" ")
        })),
        "know": ep2h.skills.filter((skill: any) => skill.name.startsWith("Know: ")).map((skill: any) => ({
          points: skill.rank,
          specialization: skill.specializations.join(" ")
        })),
        "medicine": ep2h.skills.filter((skill: any) => skill.name.startsWith("Medicine: ")).map((skill: any) => ({
          points: skill.rank,
          specialization: skill.specializations.join(" ")
        })),
        "pilot": ep2h.skills.filter((skill: any) => skill.name.startsWith("Pilot: ")).map((skill: any) => ({
          points: skill.rank,
          specialization: skill.specializations.join(" ")
        })),
      },
      "homeDevice": {
        "actorId": "",
        "itemId": ""
      },
      "network": {
        "masterDeviceId": "",
        "systemDefenders": [],
        "unslavedDevices": []
      },
      "assets": [],
      "settings": {
        "canDefault": true,
        "trackMentalHealth": true,
        "useThreat": false,
        "characterDetails": true,
        "threatDetails": false,
        "trackPoints": true,
        "trackReputations": true,
        "ignoreOverburdened": false
      },
      "shortRecharge": {
        "refreshStartTime": 0,
        "taken": ep2h.shortrests - ep2h.shortrests_left
      },
      "longRecharge": {
        "refreshStartTime": 0,
        "taken": ep2h.longrest_used ? 1 : 0
      },
      "motivations": ep2h.motivations.split(",").map((motivation: string) => motivation.trim()), // TODO: get motivation format
      "points": {
        "customization": 0,
        "gear": 0,
        "morph": 0,
        "rez": ep2h.rez_unspent,
        "credits": 0
      },
      "accumulatedTimeStart": 0,
      "tasks": [],
      "reps": {
        "@Rep": {
          "major": ep2h.rep_real.a_rep.maj_favors,
          "minor": ep2h.rep_real.a_rep.min_favors,
          "moderate": ep2h.rep_real.a_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.a_rep.value,
          "track": false
        },
        "cRep": {
          "major": ep2h.rep_real.c_rep.maj_favors,
          "minor": ep2h.rep_real.c_rep.min_favors,
          "moderate": ep2h.rep_real.c_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.c_rep.value,
          "track": false
        },
        "fRep": {
          "major": ep2h.rep_real.f_rep.maj_favors,
          "minor": ep2h.rep_real.f_rep.min_favors,
          "moderate": ep2h.rep_real.f_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.f_rep.value,
          "track": false
        },
        "gRep": {
          "major": ep2h.rep_real.g_rep.maj_favors,
          "minor": ep2h.rep_real.g_rep.min_favors,
          "moderate": ep2h.rep_real.g_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.g_rep.value,
          "track": false
        },
        "iRep": {
          "major": ep2h.rep_real.i_rep.maj_favors,
          "minor": ep2h.rep_real.i_rep.min_favors,
          "moderate": ep2h.rep_real.i_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.i_rep.value,
          "track": false
        },
        "rRep": {
          "major": ep2h.rep_real.r_rep.maj_favors,
          "minor": ep2h.rep_real.r_rep.min_favors,
          "moderate": ep2h.rep_real.r_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.r_rep.value,
          "track": false
        },
        "xRep": {
          "major": ep2h.rep_real.x_rep.maj_favors,
          "minor": ep2h.rep_real.x_rep.min_favors,
          "moderate": ep2h.rep_real.x_rep.mod_favors,
          "refreshStartTime": 0,
          "score": ep2h.rep_real.x_rep.value,
          "track": false
        }
      },
      "skills": {
        "athletics": convertSkill("Athletics"),
        "deceive": convertSkill("Deceive"),
        "fray": convertSkill("Fray"),
        "freeFall": convertSkill("Free Fall"),
        "guns": convertSkill("Guns"),
        "infiltrate": convertSkill("Infiltrate"),
        "infosec": convertSkill("Infosec"),
        "interface": convertSkill("interface"),
        "kinesics": convertSkill("kinesics"),
        "melee": convertSkill("Melee"),
        "perceive": convertSkill("Perceive"),
        "persuade": convertSkill("Persuade"),
        "program": convertSkill("Program"),
        "provoke": convertSkill("Provoke"),
        "psi": convertSkill("Psi"),
        "research": convertSkill("Research"),
        "survival": convertSkill("Survival")
      },
      "spentPools": {
        "flex": ep2h.flex_left,
        "insight": ep2h.insight_left,
        "moxie": ep2h.moxie_left,
        "threat": 0,
        "vigor":ep2h.vigor_left
      },
      "flex": ep2h.flex_ego,
      "threat": 0,
      "characterDetails": {
        "age": ep2h.age.toString(),
        "aliases": ep2h.aliases.toString(),
        "background": ep2h.background_name,
        "career": ep2h.career_name,
        "faction": ep2h.faction_name,
        "gender": ep2h.gender,
        "interest": ep2h.interest,
        "languages": ep2h.languages,
      },
      "egoType": "",
      "forkType": "",
      "threatDetails": {
        "level": "yellow",
        "niche": "",
        "numbers": "",
        "stress": {
          "sv": "",
          "minSV": 1,
          "minStressOption": "none",
          "notes": ""
        }
      },
      "combatState": {
        "complexAim": false,
        "fullDefense": "",
        "aggressive": false
      },
      "mentalHealth": {
        "alienation": 0,
        "damage": 0,
        "helplessness": 0,
        "log": [],
        "naturalHealAttempts": [],
        "violence": 0,
        "wounds": 0,
        "lastGainedStressTime": -1,
        "aidedHealTickStartTime": -1,
        "damageRepair": {
          "amount": "",
          "interval": 0
        },
        "ownHealTickStartTime": -1,
        "woundRepair": {
          "interval": 0,
          "amount": 0
        }
      }
    },
    "items": [ // TODO: need to learn how to parse items
      {
        "name": "Exotic Morphology",
        "type": "trait",
        "_id": "28wfE0pSsFMDLURQ",
        "system": {
          "description": "<p>This morph is substantially physiologically (and possibly neurologically) \n      different from the baseline humanoid forms most transhumans are accustomed to sleeving. \n      You receive a –10 modifier per level on Integration Tests ▶288 when sleeving into this morph. \n      This modifier does not apply to the original morph of uplift or infolife\n      characters. This trait may not be applied to morphs that don’t come with it.</p>",
          "reference": "Eclipse Phase Second Editon p. 78",
          "restrictions": "May not be applied to morphs that don't come with it.",
          "triggers": "",
          "source": "morph",
          "state": {
            "level": 3,
            "triggered": false
          },
          "levels": [
            {
              "id": "u9mw4oomvaw1mayq",
              "cost": 1,
              "effects": [
                {
                  "id": "eo7b4fqooxjzitaw",
                  "type": "successTest",
                  "tags": [
                    {
                      "type": "special",
                      "test": "integration"
                    }
                  ],
                  "modifier": -10,
                  "toOpponent": false,
                  "requirement": "not original morph type"
                }
              ]
            },
            {
              "id": "5bbw68wid7v7ds0f",
              "cost": 2,
              "effects": [
                {
                  "id": "8o0shzn0hhxupdfg",
                  "type": "successTest",
                  "tags": [
                    {
                      "type": "special",
                      "test": "integration"
                    }
                  ],
                  "modifier": -20,
                  "toOpponent": false,
                  "requirement": "not original morph type"
                }
              ]
            },
            {
              "id": "gxe1lr9kwmu7q9oo",
              "cost": 3,
              "effects": [
                {
                  "id": "rugijl5php4joon2",
                  "type": "successTest",
                  "tags": [
                    {
                      "type": "special",
                      "test": "integration"
                    }
                  ],
                  "modifier": -30,
                  "toOpponent": false,
                  "requirement": "not original morph type"
                }
              ]
            }
          ],
          "subtype": "",
          "traitType": "negative"
        },
        "img": "icons/svg/mystery-man.svg",
        "flags": {},
        "ownership": {
          "default": 3,
          "DBEucvjYl3mGGh7U": 3
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "_stats": {
          "systemId": "ep2e",
          "systemVersion": "1.0.6",
          "coreVersion": "10.291",
          "createdTime": 1676689735189,
          "modifiedTime": 1676689735189,
          "lastModifiedBy": "DBEucvjYl3mGGh7U"
        }
      },
      {
        "name": "Digital Speed",
        "type": "trait",
        "_id": "wGopP5TPuyQKZeA0",
        "system": {
          "description": "<p>This trait is only available to infomorphs. Unfettered by the physical,\n      you reduce timeframes for mesh-based task actions by 25%; this is\n      cumulative with reduced time from superior successes.</p>",
          "reference": "Eclipse Phase Second Editon p. 73",
          "restrictions": "",
          "triggers": "",
          "source": "morph",
          "state": {
            "level": 0,
            "triggered": false
          },
          "levels": [
            {
              "id": "9ex232dbkfs8myda",
              "cost": 1,
              "effects": [
                {
                  "type": "duration",
                  "subtype": "taskActionTimeframe",
                  "modifier": -25,
                  "taskType": "mesh",
                  "cummulative": false,
                  "halve": false,
                  "id": "2wlrjhm7llw8heqr"
                }
              ]
            }
          ],
          "subtype": "",
          "traitType": "positive"
        },
        "img": "icons/svg/mystery-man.svg",
        "flags": {},
        "ownership": {
          "default": 3,
          "DBEucvjYl3mGGh7U": 3
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "_stats": {
          "systemId": "ep2e",
          "systemVersion": "1.0.6",
          "coreVersion": "10.291",
          "createdTime": 1676689735190,
          "modifiedTime": 1676689735190,
          "lastModifiedBy": "DBEucvjYl3mGGh7U"
        }
      },
      {
        "name": "Mnemonics",
        "type": "software",
        "_id": "oGoJibvNzvIN4OYI",
        "system": {
          "description": "<p>The electronic minds of cyberbrains and infomorphs mimic biological brains in how they store memories — as\n      networked but scattered groups of neurons. Despite being computerized, their memory recall is not any more efficient than bio brains.\n      Mnemonics systems, however, allow memories to be tagged and\n      roughly indexed. This improves memory recall, though it remains\n      far from perfect. Mnemonics applies a +20 modifier to COG Checks\n      for memory recall. Mnemonic data can be transferred with an\n      ego when it resleeves, but the modifier applies only for memories\n      that were recorded when mnemonics ware is present. Mnemonics\n      systems are included in all cyberbrains.</p>",
          "reference": "",
          "complexity": "minor",
          "restricted": false,
          "quality": "average",
          "softwareType": "meshware",
          "activatedEffects": [],
          "effects": [
            {
              "id": "4wb0ho7tg3pfy8v4",
              "type": "successTest",
              "tags": [
                {
                  "type": "aptitudeCheck",
                  "aptitude": "cog"
                }
              ],
              "modifier": 20,
              "toOpponent": false,
              "requirement": "Memory-related"
            }
          ],
          "category": "",
          "serviceDuration": -1,
          "skills": [],
          "activation": "",
          "meshAttacks": 0,
          "meshHealth": {
            "baseDurability": 10,
            "damage": 0,
            "log": [],
            "wounds": 0,
            "rebootEndTime": -1,
            "crashWounds": 0
          },
          "state": {
            "activated": false,
            "equipped": true,
            "serviceStartTime": 0,
            "paused": false
          },
          "primaryAttack": {
            "armorPiercing": false,
            "attackTraits": [],
            "damageFormula": "",
            "damageType": "mesh",
            "useMeshArmor": true,
            "notes": "",
            "aptitudeCheckInfo": {
              "armorAsModifier": "",
              "check": "",
              "checkModifier": 0,
              "checkFailure": [],
              "checkSuccess": [],
              "criticalCheckFailure": []
            },
            "label": "",
            "reduceAVbyDV": false
          },
          "secondaryAttack": {
            "armorPiercing": false,
            "attackTraits": [],
            "damageFormula": "",
            "damageType": "mesh",
            "useMeshArmor": true,
            "notes": "",
            "aptitudeCheckInfo": {
              "armorAsModifier": "",
              "check": "",
              "checkModifier": 0,
              "checkFailure": [],
              "checkSuccess": [],
              "criticalCheckFailure": []
            },
            "label": "",
            "reduceAVbyDV": false
          }
        },
        "img": "icons/svg/mystery-man.svg",
        "flags": {},
        "ownership": {
          "default": 3,
          "DBEucvjYl3mGGh7U": 3
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "_stats": {
          "systemId": "ep2e",
          "systemVersion": "1.0.6",
          "coreVersion": "10.291",
          "createdTime": 1676689735191,
          "modifiedTime": 1676689735191,
          "lastModifiedBy": "DBEucvjYl3mGGh7U"
        }
      }
    ],
    "effects": [],
    "flags": {
      "ep2e": {
        "infomorph": {
          "name": "Digimorph",
          "type": "infomorph",
          "img": "icons/svg/mystery-man.svg",
          "permission": {
            "default": 3
          },
          "_id": "7bh5ehusi7lupxlk",
          "system": {
            "description": "<p>Digimorphs are bare-bones mind emulations, though customizable and widely\n        used. By default, an ego that evacuates (or is forked from) a cyberbrain is run\n        on a digimorph, unless another infomorph option is available.</p>",
            "reference": "Eclipse Phase Second Editon p. 67",
            "acquisition": {
              "availability": 100,
              "complexity": "minor",
              "cost": 0,
              "resource": "morphPoints",
              "restricted": false
            },
            "pools": {
              "insight": 0,
              "moxie": 0,
              "vigor": 0,
              "flex": 0
            },
            "damagedArmor": [],
            "conditions": [],
            "meshHealth": {
              "baseDurability": 25,
              "damage": 0,
              "aidedHealTickStartTime": -1,
              "ownHealTickStartTime": -1,
              "damageRepair": {
                "amount": "1d10",
                "interval": 60000
              },
              "woundRepair": {
                "amount": 1,
                "interval": 60000
              },
              "log": [],
              "rebootEndTime": -1,
              "crashWounds": 0,
              "wounds": 0
            }
          },
          "flags": {},
          "items": [
            {
              "name": "Exotic Morphology",
              "type": "trait",
              "_id": "ibu9w196xm7e6a4f",
              "system": {
                "description": "<p>This morph is substantially physiologically (and possibly neurologically) \n      different from the baseline humanoid forms most transhumans are accustomed to sleeving. \n      You receive a –10 modifier per level on Integration Tests ▶288 when sleeving into this morph. \n      This modifier does not apply to the original morph of uplift or infolife\n      characters. This trait may not be applied to morphs that don’t come with it.</p>",
                "reference": "Eclipse Phase Second Editon p. 78",
                "restrictions": "May not be applied to morphs that don't come with it.",
                "triggers": "",
                "source": "morph",
                "state": {
                  "level": 3,
                  "triggered": false
                },
                "levels": [
                  {
                    "id": "u9mw4oomvaw1mayq",
                    "cost": 1,
                    "effects": [
                      {
                        "id": "eo7b4fqooxjzitaw",
                        "type": "successTest",
                        "tags": [
                          {
                            "type": "special",
                            "test": "integration"
                          }
                        ],
                        "modifier": -10,
                        "toOpponent": false,
                        "requirement": "not original morph type"
                      }
                    ]
                  },
                  {
                    "id": "5bbw68wid7v7ds0f",
                    "cost": 2,
                    "effects": [
                      {
                        "id": "8o0shzn0hhxupdfg",
                        "type": "successTest",
                        "tags": [
                          {
                            "type": "special",
                            "test": "integration"
                          }
                        ],
                        "modifier": -20,
                        "toOpponent": false,
                        "requirement": "not original morph type"
                      }
                    ]
                  },
                  {
                    "id": "gxe1lr9kwmu7q9oo",
                    "cost": 3,
                    "effects": [
                      {
                        "id": "rugijl5php4joon2",
                        "type": "successTest",
                        "tags": [
                          {
                            "type": "special",
                            "test": "integration"
                          }
                        ],
                        "modifier": -30,
                        "toOpponent": false,
                        "requirement": "not original morph type"
                      }
                    ]
                  }
                ],
                "subtype": "",
                "traitType": "negative"
              },
              "img": "icons/svg/mystery-man.svg",
              "permission": {
                "default": 3
              },
              "flags": {}
            },
            {
              "name": "Digital Speed",
              "type": "trait",
              "_id": "ibu9w196xm7e6a4f",
              "system": {
                "description": "<p>This trait is only available to infomorphs. Unfettered by the physical,\n      you reduce timeframes for mesh-based task actions by 25%; this is\n      cumulative with reduced time from superior successes.</p>",
                "reference": "Eclipse Phase Second Editon p. 73",
                "restrictions": "",
                "triggers": "",
                "source": "morph",
                "state": {
                  "level": 0,
                  "triggered": false
                },
                "levels": [
                  {
                    "id": "9ex232dbkfs8myda",
                    "cost": 1,
                    "effects": [
                      {
                        "type": "duration",
                        "subtype": "taskActionTimeframe",
                        "modifier": -25,
                        "taskType": "mesh",
                        "cummulative": false,
                        "halve": false,
                        "id": "2wlrjhm7llw8heqr"
                      }
                    ]
                  }
                ],
                "subtype": "",
                "traitType": "positive"
              },
              "img": "icons/svg/mystery-man.svg",
              "permission": {
                "default": 3
              },
              "flags": {}
            },
            {
              "name": "Mnemonics",
              "type": "software",
              "_id": "ibu9w196xm7e6a4f",
              "system": {
                "description": "<p>The electronic minds of cyberbrains and infomorphs mimic biological brains in how they store memories — as\n      networked but scattered groups of neurons. Despite being computerized, their memory recall is not any more efficient than bio brains.\n      Mnemonics systems, however, allow memories to be tagged and\n      roughly indexed. This improves memory recall, though it remains\n      far from perfect. Mnemonics applies a +20 modifier to COG Checks\n      for memory recall. Mnemonic data can be transferred with an\n      ego when it resleeves, but the modifier applies only for memories\n      that were recorded when mnemonics ware is present. Mnemonics\n      systems are included in all cyberbrains.</p>",
                "reference": "",
                "complexity": "minor",
                "restricted": false,
                "quality": "average",
                "softwareType": "meshware",
                "activatedEffects": [],
                "effects": [
                  {
                    "id": "4wb0ho7tg3pfy8v4",
                    "type": "successTest",
                    "tags": [
                      {
                        "type": "aptitudeCheck",
                        "aptitude": "cog"
                      }
                    ],
                    "modifier": 20,
                    "toOpponent": false,
                    "requirement": "Memory-related"
                  }
                ],
                "category": "",
                "serviceDuration": -1,
                "skills": [],
                "activation": "",
                "meshAttacks": 0,
                "meshHealth": {
                  "baseDurability": 10,
                  "damage": 0,
                  "log": [],
                  "wounds": 0,
                  "rebootEndTime": -1,
                  "crashWounds": 0
                },
                "state": {
                  "activated": false,
                  "equipped": true,
                  "serviceStartTime": 0,
                  "paused": false
                },
                "primaryAttack": {
                  "armorPiercing": false,
                  "attackTraits": [],
                  "damageFormula": "",
                  "damageType": "mesh",
                  "useMeshArmor": true,
                  "notes": "",
                  "aptitudeCheckInfo": {
                    "armorAsModifier": "",
                    "check": "",
                    "checkModifier": 0,
                    "checkFailure": [],
                    "checkSuccess": [],
                    "criticalCheckFailure": []
                  },
                  "label": "",
                  "reduceAVbyDV": false
                },
                "secondaryAttack": {
                  "armorPiercing": false,
                  "attackTraits": [],
                  "damageFormula": "",
                  "damageType": "mesh",
                  "useMeshArmor": true,
                  "notes": "",
                  "aptitudeCheckInfo": {
                    "armorAsModifier": "",
                    "check": "",
                    "checkModifier": 0,
                    "checkFailure": [],
                    "checkSuccess": [],
                    "criticalCheckFailure": []
                  },
                  "label": "",
                  "reduceAVbyDV": false
                }
              },
              "img": "icons/svg/mystery-man.svg",
              "permission": {
                "default": 3
              },
              "flags": {}
            }
          ],
          "effects": [],
          "prototypeToken": {
            "flags": {},
            "name": "Digimorph",
            "displayName": 0,
            "texture": {
              "src": "icons/svg/mystery-man.svg",
              "tint": null
            },
            "width": 1,
            "height": 1,
            "scale": 1,
            "mirrorX": false,
            "mirrorY": false,
            "lockRotation": false,
            "rotation": 0,
            "vision": false,
            "dimSight": 0,
            "brightSight": 0,
            "dimLight": 0,
            "brightLight": 0,
            "sightAngle": 360,
            "lightAngle": 360,
            "lightColor": "",
            "lightAlpha": 1,
            "actorId": "7bh5ehusi7lupxlk",
            "actorLink": false,
            "actorData": {},
            "disposition": -1,
            "displayBars": 0,
            "randomImg": false,
            "bar1": {
              "attribute": ""
            },
            "bar2": {
              "attribute": ""
            }
          }
        }
      },
      "exportSource": {
        "world": "eptetsw",
        "system": "ep2e",
        "coreVersion": "10.291",
        "systemVersion": "1.0.6"
      }
    },
    "_stats": {
      "systemId": "ep2e",
      "systemVersion": "1.0.6",
      "coreVersion": "10.291",
      "createdTime": 1676689735142,
      "modifiedTime": 1676689735359,
      "lastModifiedBy": "DBEucvjYl3mGGh7U"
    }
  };

  fs.writeFileSync(output, JSON.stringify(actor, null, 2));

};

createFoundryActor("./examples/ep2-helpers/empty.txt", "./examples/foundry/converted.json");
