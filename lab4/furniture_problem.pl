	start_state([table, chair, wardrobe, chair, empty, armchair]).
	end_state([_, _, armchair,_, _, wardrobe]).
	possible_moves([[1, 2],[2, 3],[4, 5],[5, 6],[1, 4],[2, 5],[3, 6]]).

	main(MaxDepth, Decision):-
    	start_state(State),
        writeln(State),
    	depth_first(State,[],0, MaxDepth,Decision),
		%it could be done much better
		writeln(Decision).
	
	%+list,+Counter,-PositionOfEmpty
	search_empty([E|_],I,I):-
		E=empty.
	search_empty([E|Es],I,N):-
		E\=empty,
		I1 is I+1,
		search_empty(Es,I1,N).

	%+FirstElementPosition, +SecondElementPosition
	is_allowed_movement(A,B):-
    	possible_moves(Moves),
    	(member([B, A], Moves);member([A, B], Moves)).


	%+list, +EmptyPosition,+Counter,-PositionOfAllowedTarget,-AllowedTarget
	search_allowed_target([E|_],EmptyPosition,Counter,Counter, E):-
        is_allowed_movement(EmptyPosition,Counter).
	search_allowed_target([_|Es], EmptyPosition,Counter,PositionOfAllowedTarget,AllowedTarget):-
		Counter1 is Counter+1,
		search_allowed_target(Es,EmptyPosition,Counter1,PositionOfAllowedTarget,AllowedTarget).

	
	%CurentState, ListOfOpenState,-ListOfMovesFromCurentToFinalState
	depth_first(State,_,_,_,[]):-
		end_state(State).
	depth_first(State,History,Depth,MaxDepth,[Move|Moves]):-
        Depth<MaxDepth,  
    	search_empty(State, 1, PositionOfEmpty),
    	search_allowed_target(State,PositionOfEmpty,1,PositionOfAllowedTarget,AllowedTarget),
		move(AllowedTarget,PositionOfAllowedTarget,PositionOfEmpty,State,State1,Move),
		not(member(State1,History)),
    	Depth1 is Depth + 1,
		depth_first(State1,[State1|History],Depth1,MaxDepth,Moves).

	%+Target,+PositionOfTarget,+PositionOfEmpty,+CurentState,-NextState,-Move
	move(Target,PositionOfTarget,PositionOfEmpty,State,State1,PositionOfTarget-PositionOfEmpty):-
		rearrange(State,Target,PositionOfEmpty,InterimState),
		rearrange(InterimState,empty,PositionOfTarget,State1).

	%+ListOfCurentState,+Item,+Counter,-ListOfNewState
	rearrange([X|Xs],A,I,[X|Xn]):-
		I>1,
		I1 is I-1,
		rearrange(Xs,A,I1,Xn).
	rearrange([_|Xs],A,1,[A|Xs]).

