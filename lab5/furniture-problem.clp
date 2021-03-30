(defmodule MAIN
  (export deftemplate status))

;;; The status facts hold the state
;;; information of the search tree.

;[p1, p2, p3]
;[p4, p5, p6]


;[table, chair, wardrobe]
;[chair, empty, armchair]

(deftemplate MAIN::status
   (slot search-depth (type INTEGER) (range 1 ?VARIABLE))
   (slot parent (type FACT-ADDRESS SYMBOL) (allowed-symbols no-parent))
   (slot p1 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot p2 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot p3 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot p4 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot p5 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot p6 (type SYMBOL) (allowed-symbols table chair wardrobe chair empty armchair))
   (slot last-move
      (type SYMBOL) (allowed-symbols no-move 1-2 2-3 4-5 5-6 1-4 2-5 3-6)))


(deffacts MAIN::initial-positions
  (status (search-depth 1)
          (parent no-parent)
          (p1 table)
          (p2 chair)
          (p3 wardrobe)
          (p4 chair)
          (p5 empty)
          (p6 armchair)
          (last-move no-move)))


(defrule MAIN::empty-is-p1
  ?node <- (status (search-depth ?num)
                   (p2 ?p2item)
                   (p4 ?p4item)
                   (p1 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p1 ?p2item)
                   (p2 empty)
                   (last-move 1-2))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p1 ?p4item)
                   (p4 empty)
                   (last-move 1-4)))



(defrule MAIN::empty-is-p2
  ?node <- (status (search-depth ?num)
                   (p1 ?p1item)
                   (p3 ?p3item)
                   (p5 ?p5item)
                   (p2 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p2 ?p1item)
                   (p1 empty)
                   (last-move 1-2))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p2 ?p3item)
                   (p3 empty)
                   (last-move 2-3))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p2 ?p5item)
                   (p5 empty)
                   (last-move 2-5)))



(defrule MAIN::empty-is-p3
  ?node <- (status (search-depth ?num)
                   (p2 ?p2item)
                   (p6 ?p6item)
                   (p3 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p3 ?p2item)
                   (p2 empty)
                   (last-move 2-3))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p3 ?p6item)
                   (p6 empty)
                   (last-move 3-6)))




(defrule MAIN::empty-is-p4
  ?node <- (status (search-depth ?num)
                   (p1 ?p1item)
                   (p5 ?p5item)
                   (p4 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p4 ?p1item)
                   (p1 empty)
                   (last-move 1-4))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p4 ?p5item)
                   (p5 empty)
                   (last-move 4-5)))



(defrule MAIN::empty-is-p5
  ?node <- (status (search-depth ?num)
                   (p2 ?p2item)
                   (p4 ?p4item)
                   (p6 ?p6item)
                   (p5 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p5 ?p4item)
                   (p4 empty)
                   (last-move 4-5))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p5 ?p6item)
                   (p6 empty)
                   (last-move 5-6))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p5 ?p2item)
                   (p2 empty)
                   (last-move 2-5)))



(defrule MAIN::empty-is-p6
  ?node <- (status (search-depth ?num)
                   (p3 ?p3item)
                   (p5 ?p5item)
                   (p6 empty))
  =>
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p6 ?p3item)
                   (p3 empty)
                   (last-move 3-6))
  (duplicate ?node (search-depth =(+ 1 ?num))
                   (parent ?node)
                   (p6 ?p5item)
                   (p5 empty)
                   (last-move 5-6)))


(defmodule CONSTRAINTS
  (import MAIN deftemplate status))


(defrule CONSTRAINTS::circular-path
  (declare (auto-focus TRUE))
  (status (search-depth ?sd1)
          (p1 ?p1item)
          (p2 ?p2item)
          (p3 ?p3item)
          (p4 ?p4item)
          (p5 ?p5item)
          (p6 ?p6item))
  ?node <- (status (search-depth ?sd2&:(< ?sd1 ?sd2))
                   (p1 ?p1item)
                   (p2 ?p2item)
                   (p3 ?p3item)
                   (p4 ?p4item)
                   (p5 ?p5item)
                   (p6 ?p6item))
  =>
  (retract ?node))




(defmodule SOLUTION
  (import MAIN deftemplate status))

(deftemplate SOLUTION::moves
   (slot id (type FACT-ADDRESS SYMBOL) (allowed-symbols no-parent))
   (multislot moves-list
      (type SYMBOL) (allowed-symbols no-move 1-2 2-3 4-5 5-6 1-4 2-5 3-6)))


(defrule SOLUTION::recognize-solution
  (declare (auto-focus TRUE))
  ?node <- (status (parent ?parent)
                   (p3 armchair)
                   (p6 wardrobe)
                   (last-move ?move))
  =>
  (retract ?node)
  (assert (moves (id ?parent) (moves-list ?move))))


(defrule SOLUTION::further-solution
  ?node <- (status (parent ?parent)
                   (last-move ?move))
  ?mv <- (moves (id ?node) (moves-list $?rest))
  =>
  (modify ?mv (id ?parent) (moves-list ?move ?rest)))


(defrule SOLUTION::print-solution
  ?mv <- (moves (id no-parent) (moves-list no-move $?m))
  =>
  (retract ?mv)
  (println "Solution found: ")
  (bind ?length (length$ ?m))
  (bind ?i 1)
  (while (<= ?i ?length)
     (bind ?thing (nth$ ?i ?m))
     (println ?thing)
     (bind ?i (+ 1 ?i)))
  (println ""))



